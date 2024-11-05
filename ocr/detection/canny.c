#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include <SDL2/SDL.h>
#include <err.h>


/*Return a normalized square Gaussian mask of a specified size and standard deviation (sigma).
  The mask values are normalized (the sum of all values equals 1).*/
double **createGaussianMask(int size, double sigma)
{
    // Allocate memory for the mask
    // Assumes sufficient memory is available
    double **mask = (double **)malloc(size * sizeof(double *));
    for (int i = 0; i < size; i++)
    {
        mask[i] = (double *)malloc(size * sizeof(double));
    }

    double sum = 0.0;
    int halfSize = size / 2;
    
    // Fill the mask with Gaussian values
    for (int x = -halfSize; x <= halfSize; x++)
    {
        for (int y = -halfSize; y <= halfSize; y++)
        {
            double value = (1.0 / (2.0 * M_PI * sigma * sigma)) * exp(-(x * x + y * y) / (2.0 * sigma * sigma));
            mask[x + halfSize][y + halfSize] = value;
            sum += value;
        }
    }

    // Normalize the mask
    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            mask[i][j] /= sum;
        }
    }

    return mask;
}

// Apply a filter to an image
void applyFilter(double **image, double **mask, int imageWidth, int imageHeight,
                 int maskSize, double **result)
{
    int halfmaskSize = maskSize / 2;

    // Iterate over each pixel in the image,
    for (int i = 0; i < imageHeight; i++) 
    {
        for (int j = 0; j < imageWidth; j++) 
        {
            double sum = 0.0;

            // Apply the mask
            for (int k = 0; k < maskSize; k++) 
            {
                for (int l = 0; l < maskSize; l++) 
                {
                    int x = j + l - halfmaskSize;
                    int y = i + k - halfmaskSize;

                    // Check if the pixel is within the image bounds
                    if (x >= 0 && x < imageWidth && y >= 0 && y < imageHeight) 
                    {
                        sum += image[y][x] * mask[k][l];
                    }
                }
            }
            result[i][j] = sum;
        }
    }
}

/*  Normalizes the gradient angle to the nearest discrete angle in degrees
    (0°, 45°, 90°, 135°) and returns it. 
    The input angle is expected to be in radians between -π and π.*/
int toNormalizeDegreeAngle(double angle)
{
    double degrees = angle * (180.0 / M_PI);
    degrees += (degrees < 0.0) ? 180.0 : 0;
    return (degrees < 157.5) ? 45 * (floor((degrees + 22.5) / 45.0)) : 0;
}

// Calculate gradient magnitude and normalized angle in degree for each pixel
void magnitudesAndAngles(double **image, int imageWidth, int imageHeight, double
                         **gradientMagnitude, int **degreeAngles)
{
    // Scale factor for the Sobel masks
    /*scale ++ -> less artifacts but less edges too
      scale -- -> more artifacts*/

    //3x3 Sobel masks
    /*double scale = 10; 
    int size = 3;
    double maskX[3][3] = 
    {
        {-1,  0,  1},
        {-2,  0,  2},
        {-1,  0,  1}
    };
    double maskY[3][3] = 
    {
        {-1, -2, -1},
        { 0,  0,  0},
        { 1,  2,  1}
    };*/

    //5x5 Sobel masks
    double scale = 130;
    int size = 5;
    double maskX[5][5] =
    {
        {-1, -2,  0,  2,  1},
        {-4, -8,  0,  8,  4},
        {-6, -12, 0, 12,  6},
        {-4, -8,  0,  8,  4},
        {-1, -2,  0,  2,  1}
    };
    double maskY[5][5] =
    {
        {-1, -4, -6, -4, -1},
        {-2, -8, -12, -8, -2},
        { 0,  0,  0,  0,  0},
        { 2,  8, 12,  8,  2},
        { 1,  4,  6,  4,  1}
    };

    // Scale down the mask coefficients
    for (int i = 0; i < size; i++)
    {
        for (int j = 0; j < size; j++)
        {
            maskX[i][j] /= scale;
            maskY[i][j] /= scale;
        }
    }

    int halfmaskSize = size / 2;
    
    // Iterate over each pixel in the image, avoiding borders
    for (int x = 0; x < imageHeight - 2*halfmaskSize; x++)
    {
        for (int y = 0; y < imageWidth - 2*halfmaskSize; y++)
        {
            double gradientX = 0.0;
            double gradientY = 0.0;

            // Apply the masks
            for (int i = 0; i < size; i++) //à modifier
            {
                for (int j = 0; j < size; j++) //à modifier
                {
                    double pixel = image[x + i][y + j];
                    gradientX += pixel * maskX[i][j];
                    gradientY += pixel * maskY[i][j];
                }
            }
            gradientMagnitude[x][y] = sqrt(gradientX * gradientX + gradientY * gradientY);
            degreeAngles[x][y] = toNormalizeDegreeAngle(atan2(gradientY, gradientX));
        }
    }
}

// Get the valid neighbors of a pixel based on the angle
void getValidNeighbors(int angle, double** gradientMagnitude,double *neighbor1,double *neighbor2,int imageHeight,int imageWidth,int x,int y)
{
        int x2 = x;
        int y2 = y;

        // Get the neighbors coordinates based on the angle
        if (angle == 0)
        {
            y--;
            y2++;
        }
        else
        {
            x--;
            x2++;
            if (angle == 45)
            {
                y++;
                y2--;
            }
            else if (angle == 135)
            {
                y--;
                y2++;
            }
            else if (angle != 90)
            {
                *neighbor1 = 0.0;
                *neighbor2 = 0.0;
                return;
            }
        }

        *neighbor1 = (x >= 0 && x < imageHeight && y >= 0 && y < imageWidth) ? gradientMagnitude[x][y] : 0.0;
        *neighbor2 = (x2 >= 0 && x2 < imageHeight && y2 >= 0 && y2 < imageWidth) ? gradientMagnitude[x2][y2] : 0.0;

}

// Suppresses non-maximum (NMS) pixels in the gradient magnitude image. 
void nonMaxSuppression(double **gradientMagnitude, int **degreeAngles, double **nonMaximum, int imageHeight, int imageWidth)
{
    for (int x = 0; x < imageHeight; x++)
    {
        for (int y = 0; y < imageWidth; y++)
        {
            double neighbor1, neighbor2;
            getValidNeighbors(degreeAngles[x][y],gradientMagnitude,&neighbor1,&neighbor2,imageHeight,imageWidth,x,y);

            // Remove the current pixel if its gradient magnitude is less than that of any neighboring pixels
            if (gradientMagnitude[x][y] < neighbor1 || gradientMagnitude[x][y] < neighbor2)
            {
                nonMaximum[x][y] = 0.0;
            }
        }
    }
}

// Perform hysteresis thresholding on the non-maximum suppressed image.
void hysteresisThresholding(double **nonMaximum, int **degreeAngles, double **edges, int imageHeight, int imageWidth, double highThreshold, double lowThreshold)
{
    // Ensure the high threshold is greater than the low threshold
    if (lowThreshold >= highThreshold)
    {
        err(EXIT_FAILURE, "⚠️ High threshold must be greater than low threshold");
    }

    /*Reknder :  
    black = 0
    white = 255*/

    // First pass through the image
    for (int i = 0; i < imageHeight; i++)
    {
        for (int j = 0; j < imageWidth; j++)
        {
            if (nonMaximum[i][j] *255 > highThreshold)
            {
                edges[i][j] = 255;
            }
            else if (nonMaximum[i][j] * 255 < lowThreshold)
            {
                edges[i][j] = 0;
            }
        }
    }

    // Second pass through the image
    for (int x = 0; x < imageHeight; x++)
    {
        for (int y = 0; y < imageWidth; y++)
        {
            if (nonMaximum[x][y] * 255 >= lowThreshold && nonMaximum[x][y] * 255 <= highThreshold)
            {
                int angle = (degreeAngles[x][y] + 90)%180;
           
                double neighbor1, neighbor2;
                getValidNeighbors(angle, (double**)degreeAngles,&neighbor1,&neighbor2,imageHeight,imageWidth, x,y);

                if (neighbor1 > highThreshold && neighbor2 > highThreshold)
                {
                    edges[x][y] = 255;
                }
                else
                {
                    edges[x][y] = 0;
                }
            }
        }
    }

    /*for (int i = 0; i < imageHeight; i++)
    {
        for (int j = 0; j < imageWidth; j++)
        {
            edges[i][j] = (nonMaximum[i][j] * 255 > highThreshold) ? 255 : (nonMaximum[i][j] * 255 < lowThreshold) ? 0 : edges[i][j];
        }
    }*/
}

// Function to apply the Canny Filter
void canny(char *filename, bool verbose)
{
    if (verbose) printf("\n🔍 Canny edge detection...\n");

    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) < 0) errx(EXIT_FAILURE, "%s", SDL_GetError());

    // Load the image
    SDL_Surface *inputImage = SDL_LoadBMP(filename);
    if (!inputImage)
    {
        SDL_Quit();
        errx(EXIT_FAILURE, "%s", SDL_GetError());
    }

    int imageWidth = inputImage->w;
    int imageHeight = inputImage->h;

    // Create 2D arrays to store the image data, filtered image, gradient magnitude, and gradient angles
    // Assumes sufficient memory is available
    double **image = malloc(imageHeight * sizeof(double *));
    double **imageFiltered = malloc(imageHeight * sizeof(double *));
    double **gradientMagnitude = malloc(imageHeight * sizeof(double *));
    int **degreeAngles = malloc(imageHeight * sizeof(int *));
    for (int x = 0; x < imageHeight; x++)
    {
        image[x] = malloc(imageWidth * sizeof(double));
        for (int y = 0; y < imageWidth; y++)
        {
            Uint8 *pixel = (Uint8 *)inputImage->pixels + x * inputImage->pitch + y;
            image[x][y] = (double)(*pixel);
        }
        imageFiltered[x] = malloc(imageWidth * sizeof(double));
        gradientMagnitude[x] = malloc(imageWidth * sizeof(double));
        degreeAngles[x] = malloc(imageWidth * sizeof(int));
    }
    
    // Perform Canny edge detection to identify and refine edges in the image
    if(verbose) printf("🎨 Creating Gaussian mask...\n");
    int maskSize = 5;
    double **mask = createGaussianMask(maskSize, 1.0);

    if (verbose) printf("🪄 Applying filter...\n");
    applyFilter(image, mask, imageWidth, imageHeight, maskSize, imageFiltered);

    if (verbose) printf("📐 Calculating magnitudes and angles...\n");
    magnitudesAndAngles(imageFiltered, imageWidth, imageHeight, gradientMagnitude, degreeAngles);

    double ** nonMaximum = gradientMagnitude;
    double ** result = nonMaximum;

    if (verbose) printf("🗑️ Supressing non-maximums...\n");
    nonMaxSuppression(gradientMagnitude, degreeAngles, nonMaximum, imageHeight, imageWidth);
    
    if (verbose) printf("⚖️ Hysteresis thresholding...\n");
    hysteresisThresholding(nonMaximum, degreeAngles, result, imageHeight, imageWidth, 58, 30);
    
    // Create an SDL surface for the resulting image
    SDL_Surface *resultImage = SDL_CreateRGBSurface(0, imageWidth, imageHeight, 8, 0, 0, 0, 0);
    if (!resultImage) errx(EXIT_FAILURE, "%s", SDL_GetError());

    // Set the palette for black and white
    SDL_Color bwPalette[2];
    bwPalette[0].r = 0;   // Black
    bwPalette[0].g = 0;   // Black
    bwPalette[0].b = 0;   // Black
    bwPalette[0].a = 255; // Opaque

    bwPalette[1].r = 255; // White
    bwPalette[1].g = 255; // White
    bwPalette[1].b = 255; // White
    bwPalette[1].a = 255; // Opaque

    SDL_SetPaletteColors(resultImage->format->palette, bwPalette, 0, 2);


    // Fill the surface with the resulting image data
    for (int x = 0; x < imageHeight; x++)
    {
        for (int y = 0; y < imageWidth; y++)
        {
            Uint8 *pixel = (Uint8 *)resultImage->pixels + x * resultImage->pitch + y; // 8-bit pixel access
            *pixel = (result[x][y] > 0.5) ? 1 : 0;
        }
    }


    // Save the resulting image
    if (SDL_SaveBMP(resultImage, "intermediate/canny.bmp") != 0) errx(EXIT_FAILURE, "%s", SDL_GetError());

    // Free resources
    for (int i = 0; i < imageHeight; i++)
    {
        free(image[i]);
        free(imageFiltered[i]);
        free(gradientMagnitude[i]);
        free(degreeAngles[i]);
    }
    for(int i = 0; i< maskSize; i++)
    {
        free(mask[i]);
    }
    free(image);
    free(imageFiltered);
    free(gradientMagnitude);
    free(degreeAngles);
    SDL_FreeSurface(inputImage);
    SDL_FreeSurface(resultImage);
    SDL_Quit();
}