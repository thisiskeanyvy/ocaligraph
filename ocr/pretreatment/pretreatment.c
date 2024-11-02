#include <err.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <math.h>

// Loads an image in a surface.
// The format of the surface is SDL_PIXELFORMAT_RGB888.
//
// path: Path of the image.
SDL_Surface* load_image(const char* path)
{
    SDL_Surface* temp_img = IMG_Load(path);
    if (!temp_img)
        errx(EXIT_FAILURE,"%s",SDL_GetError());
    
    SDL_Surface* final = SDL_ConvertSurfaceFormat(temp_img,SDL_PIXELFORMAT_RGB888,0);
    if (!temp_img)
        errx(EXIT_FAILURE,"%s",SDL_GetError());
    
    SDL_FreeSurface(temp_img);
    return final;
}

// Converts a colored pixel into grayscale.
//
// pixel_color: Color of the pixel to convert in the RGB format.
// format: Format of the pixel used by the surface.
Uint32 pixel_to_grayscale(Uint32 pixel_color, SDL_PixelFormat* format)
{
    Uint8 r, g, b;
    SDL_GetRGB(pixel_color, format, &r, &g, &b);
    
    Uint8 average = 0.3*r + 0.59*g + 0.11*b;
    r = g = b = average;
    Uint32 color = SDL_MapRGB(format, r, g, b);
    return color;
}

void surface_to_grayscale(SDL_Surface* surface)
{
    Uint32* pixels = surface->pixels;
    int len = surface->w * surface->h;
    SDL_PixelFormat* format = surface->format;

    SDL_LockSurface(surface);
    //----
    for (int i=0; i<len; i++)
    {
        pixels[i] = pixel_to_grayscale(pixels[i],format);
    }
    //----
    SDL_UnlockSurface(surface);
}

// Adaptive thresholding to the image
void adaptative_threshold(SDL_Surface* surface, double t)
{
    Uint32* pixels = surface->pixels;
    int width = surface->w; 
    int height = surface->h;
    SDL_PixelFormat* format = surface->format;
    Uint8 r, g, b;

    const int s2 = fmax(width, height) / 16;
    unsigned long *integral_image = calloc(width * height, sizeof(unsigned long));
    long sum = 0;
    unsigned int count = 0;
    int x1, y1, x2, y2;

    for (int y = 0; y < height; y++) {
        SDL_GetRGB(pixels[y], format, &r, &g, &b);
        sum += r;
        integral_image[y] = sum;
    }

    for (int i = 1; i < width; i++) {
        sum = 0;
        for (int j = 0; j < height; j++) {
            SDL_GetRGB(pixels[i + j * width], format, &r, &g, &b);
            sum += r;
            integral_image[i + j * width] =
                integral_image[(i - 1) + j * width] + sum;
        }
    }

    for (int i = 0; i < width; i++) {
        for (int j = 0; j < height; j++) {
            x1 = fmax(i - s2, 1);
            x2 = fmin(i + s2, width - 1);
            y1 = fmax(j - s2, 1);
            y2 = fmin(j + s2, height - 1);
            count = (x2 - x1) * (y2 - y1);
            sum = integral_image[x2 + y2 * width]
                - integral_image[x2 + (y1 - 1) * width]
                - integral_image[(x1 - 1) + y2 * width]
                + integral_image[(x1 - 1) + (y1 - 1) * width];

            SDL_GetRGB(pixels[i + j * width], format, &r, &g, &b);

            if (r * count < sum * (1.0 - t)) {
                r = 0;
                g = 0;
                b = 0;
            } else {
                r = 255;
                g = 255;
                b = 255;
            }

            pixels[i + j * width] = SDL_MapRGB(format, r, g, b);
        }
    }

    // Free
    free(integral_image);
}

// Calculation of image noise level function
float noiseLevel(SDL_Surface* surface)
{
    Uint32* pixels = surface->pixels;
    int width = surface->w; 
    int height = surface->h;
    Uint8 r, g, b;    
    SDL_PixelFormat* format = surface->format;

    float count = 0.0;
    for (int i = 1; i < width - 1; i++)
    {
        for (int j = 1; j < height - 1; j++)
        {
            double medium = 0.0;

            for (int x = -1; x <= 1; x++)
            {
                for (int y = -1; y <= 1; y++)
                {
                    SDL_GetRGB(pixels[(i + x) + (j + y) * width], format, &r, &g, &b);
                    medium += r;
                }
            }

            medium /= 9.0;
            
            SDL_GetRGB(pixels[i + j * width], format, &r, &g, &b);
            double val = 1.0 - (r / medium);
            if (val < 0.0)
            {
                val *= -1.0;
            }
            if (val > 0.5)
            {
                count++;
            }
        }
    }
    return count;
}

// Smoothing filter function
void smoothing(SDL_Surface* surface)
{
    Uint32* pixels = surface->pixels;
    int width = surface->w;
    int height = surface->h;
    SDL_PixelFormat* format = surface->format;

    // Temporary image pixels copy creation.
    Uint8** tempPixels = malloc(sizeof(Uint8*) * width);
    for (int i = 0; i < width; i++) {
        tempPixels[i] = malloc(sizeof(Uint8) * height);
    }

    // Copying pixels values into the previous copy
    for (int i = 0; i < width; i++) {
        for (int j = 0; j < height; j++) {
            Uint8 r, g, b;
            SDL_GetRGB(pixels[i + j * width], format, &r, &g, &b);
            tempPixels[i][j] = r;
        }
    }

    // Dilatation operation on the temporay copy
    for (int i = 1; i < width - 1; i++) {
        for (int j = 1; j < height - 1; j++) {
            // Pixel is white ?
            if (tempPixels[i][j] == 255) {
                // Checking if pixels around are white
                if (tempPixels[i + 1][j - 1] != 0 && tempPixels[i + 1][j] != 0
                    && tempPixels[i + 1][j + 1] != 0 && tempPixels[i][j - 1] != 0
                    && tempPixels[i][j + 1] != 0 && tempPixels[i - 1][j - 1] != 0
                    && tempPixels[i - 1][j] != 0 && tempPixels[i - 1][j + 1] != 0) {
                    // Updating the pixel
                    pixels[i + j * width] = SDL_MapRGB(format, 255, 255, 255);
                } else {
                    // Updating the pixel in black
                    pixels[i + j * width] = SDL_MapRGB(format, 0, 0, 0);
                }
            }
        }
    }

    // freeing the copy memory
    for (int i = 0; i < width; i++) {
        free(tempPixels[i]);
    }
    free(tempPixels);
}

int compareUint32(const void *a, const void *b) {
    return (*(Uint32 *)a - *(Uint32 *)b);
}

// Median filter on image function
void MedianFilter(SDL_Surface* surface) {
    Uint32* pixels = (Uint32*)surface->pixels;
    int width = surface->w;
    int height = surface->h;
    

    Uint32 matrix[9];
    
    for (int i = 1; i < width - 1; i++) {
        for (int j = 1; j < height - 1; j++) {
            int k = 0;

            for (int x = -1; x <= 1; x++) {
                for (int y = -1; y <= 1; y++) {
                    matrix[k] = pixels[(i + x) + (j + y) * width];
                    k++;
                }
            }

            qsort(matrix, 9, sizeof(Uint32), compareUint32);

            // Define the median value as new pixel value
            pixels[i + j * width] = matrix[4];
        }
    }
}
// Averge filter on image function.
void AverageFilter(SDL_Surface* surface) {
	Uint32* pixels = (Uint32*)surface->pixels;
        int width = surface->w;
        int height = surface->h;
	SDL_PixelFormat* format = surface->format;
	Uint8 r, g, b;

	float filter[9] = { 1 / 16,(1 / 16.) * 2, (1 / 16.) * 1,
                        (1 / 16.) * 2, (1 / 16.) * 4, (1 / 16.) * 2,
                        (1 / 16.) * 1, (1 / 16.) * 2, (1 / 16.) * 1 };
	float res=0;
	float res1=0;
	float res2=0;

	for (int i = 1; i < width - 1; i++) 
	{
        	for (int j = 1; j < height - 1; j++) 
		{
			int k = 0;
            		for (int x = -1; x <= 1; x++) 
			{
	                	for (int y = -1; y <= 1; y++) 
				{
					SDL_GetRGB(pixels[i + j * width], format, &r, &g, &b);
					res+=r*filter[k];
					res1+=g*filter[k];
					res2+=b*filter[k];
					k++;
					
				}	
			}
			res/=9;
			res1/=9;
			res2/=9;
			r=res;
			g=res1;
			b=res2;
		}	
	}
}

// Saving image function.
void save_image(SDL_Surface* surface, const char* filename) {
    if (SDL_SaveBMP(surface, filename) != 0) {
        errx(EXIT_FAILURE, "Failed to save the image : %s", SDL_GetError());
    }
}

int main(int argc, char** argv)
{
    // Checks the number of arguments.
    if (argc != 2)
        errx(EXIT_FAILURE, "USAGE: ./pretreatment IMAGE\n");

    // Initializes the SDL.
    if (SDL_Init(SDL_INIT_VIDEO) != 0)
        errx(EXIT_FAILURE, "%s", SDL_GetError());

    // - Create a surface from the colored image
    SDL_Surface* surface = load_image(argv[1]);

    // - Convert the surface into black and white using all the filter
    
    float t = noiseLevel(surface);
	
    surface_to_grayscale(surface);
    if(t>3000)
    {
    	MedianFilter(surface);
    }
    
    AverageFilter(surface);
    t = noiseLevel(surface);

    if(t>3000){
	t=0.5;
    }
    else if(t>0){
	t=0.15;
    }
    else{
	t=0.1;
    }
    adaptative_threshold(surface, t);
    //adaptative_threshold(surface,0.05);
    smoothing(surface);
    
    
    
    // Save the modified image to a file
    save_image(surface, "EDITED_IMAGE.bmp");
  
    //Free the surface
    SDL_FreeSurface(surface);
    
    SDL_Quit();

    return EXIT_SUCCESS;
}
