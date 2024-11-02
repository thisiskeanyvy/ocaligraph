#include <err.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <math.h>

double string_to_double(char* s)
{
	double result = 0;
	int negative = *s == '-';
	if (negative)
		s++;
	while (*s != 0)
	{
		result *= 10;
		result += *s - '0';
		s++;
	}
	if (negative)
		result = -result;
	return result;
}

void save_texture(const char* file_name, SDL_Renderer* renderer, int hypotenuse)
{
	SDL_Surface* surface = SDL_CreateRGBSurface(0, hypotenuse, hypotenuse, 32, 0,
			0, 0, 0);
	if (surface == NULL)
		errx(EXIT_FAILURE, "%s", SDL_GetError());

	int result = SDL_RenderReadPixels(renderer, NULL,
		surface->format->format, surface->pixels, surface->pitch);
	if (result != 0)
		errx(EXIT_FAILURE, "%s", SDL_GetError());

	SDL_SaveBMP(surface, file_name);
	SDL_FreeSurface(surface);
}

int main(int argc, char** argv)
{
	if (argc != 3)
		errx(EXIT_FAILURE, "USAGE: ./rotation IMAGE ANGLE");

	double angle = string_to_double(argv[2]);

	if (SDL_Init(SDL_INIT_VIDEO) != 0)
		errx(EXIT_FAILURE, "%s", SDL_GetError());

	SDL_Window* window = SDL_CreateWindow("Image Display", 0, 0, 0, 0,
SDL_WINDOW_HIDDEN);
	if (window == NULL)
		errx(EXIT_FAILURE, "%s", SDL_GetError());

	SDL_Renderer* renderer = SDL_CreateRenderer(window, -1,
SDL_RENDERER_ACCELERATED);
	if (renderer == NULL)
		errx(EXIT_FAILURE, "%s", SDL_GetError());

	SDL_Texture* texture = IMG_LoadTexture(renderer, argv[1]);
	if (texture == NULL)
		errx(EXIT_FAILURE, "%s", "Could not render texture.");
	int w;
	int h;
	if (SDL_QueryTexture(texture, NULL, NULL, &w, &h) != 0)
		errx(EXIT_FAILURE, "%s", SDL_GetError());
	int hypotenuse = sqrt(w*w + h*h);
	SDL_Rect srcrect=
	{
		.x = 0,
		.y = 0,
		.w = w,
		.h = h,
	};
	SDL_Rect dstrect = 
	{
		.x = hypotenuse/2 - w/2,
		.y = hypotenuse/2 - h/2,
		.w = w,
		.h = h,
	};

	SDL_SetWindowSize(window, hypotenuse, hypotenuse);

	SDL_RenderClear(renderer);
	SDL_RenderPresent(renderer);
	
	int result = SDL_RenderCopyEx(renderer, texture, &srcrect, &dstrect, angle,
NULL, SDL_FLIP_NONE);
	if (result != 0)
		errx(EXIT_FAILURE, "%s", SDL_GetError());
	SDL_RenderPresent(renderer);

	save_texture("ROTATED_IMAGE.bmp", renderer, hypotenuse);

	SDL_DestroyWindow(window);
	SDL_DestroyRenderer(renderer);
	SDL_DestroyTexture(texture);
	SDL_Quit();

	return EXIT_SUCCESS;
}
