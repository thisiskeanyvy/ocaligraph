#include <err.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>

#include <stdbool.h>
#include <stdio.h>
#include <string.h>

#include "tools.h"

// Save a rectangle of an image
void save_rectangle(SDL_Surface* surface, Point coordinates[2], char* name)
{
	int width = coordinates[1].x-coordinates[0].x;
	int height = coordinates[1].y-coordinates[0].y;
	
	SDL_Rect rectangle = {coordinates[0].x, coordinates[0].y, width, height};

	// Create a new surface with the rectangle
	SDL_Surface* result = SDL_CreateRGBSurface(0, width, height, 32, 0, 0, 0, 0);
	if (!result) errx(EXIT_FAILURE, "%s", SDL_GetError());

	SDL_Rect res_rectangle = {0, 0, width, height};

	// Copy the rectangle from the original image to the new surface
	if (SDL_BlitScaled(surface, &rectangle, result, &res_rectangle) != 0) errx(EXIT_FAILURE, "%s", SDL_GetError());

	// Save the new surface
	if (SDL_SaveBMP(result, name) != 0) errx(EXIT_FAILURE, "%s", SDL_GetError());

	// Free resources
	SDL_FreeSurface(result);
}

// Cut an image according to the given coordinates
void cutting(char* filename, Point coordinates[][2], size_t size, char* name, bool verbose)
{
	// Load the image
	SDL_Surface* temp = IMG_Load(filename);
	if (!temp) errx(EXIT_FAILURE, "%s", SDL_GetError());

	// Convert the image to a format that can be modified
	SDL_Surface* surface = SDL_ConvertSurfaceFormat(temp, SDL_PIXELFORMAT_RGB888, 0);
	if (!surface) errx(EXIT_FAILURE, "%s", SDL_GetError());

	char* fullname;
	if (size == 1)
	{
		asprintf(&fullname, "result/%s.bmp", name);
		save_rectangle(surface, coordinates[0], fullname);
		if (verbose) printf("🔪 %s cut and saved in the result directory\n", name);
	}
	else
	{
		//if there is a problem with the name, try to change the %zu
		for (size_t i = 0; i < size; i++)
		{
			asprintf(&fullname, "result/%s_%zu.bmp", name, i+1);
			save_rectangle(surface, coordinates[i], fullname);
		}
		if (verbose) printf("🔪 %zu %ss cut and saved in the result directory\n", size, name);
	}

	// Free resources
	SDL_FreeSurface(temp);
	SDL_FreeSurface(surface);
	free(fullname);
}