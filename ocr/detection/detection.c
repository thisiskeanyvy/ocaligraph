#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>
#include <math.h>
#include <sys/stat.h>

#include "canny.h"
#include "hough.h"
#include "cutting.h"
#include "tools.h"

/* main: Main function that calls the functions responsible for detecting the grid position,
         identifying the word list, and cropping individual letters to save them as separate images.
         The -v option enables verbose mode, which displays intermediate processing steps.*/

int main(int argc, char **argv)
{
    printf("🔬 Detection...\n");
    if (argc < 2 || argc > 3)
    {
        printf("Usage: %s <input image> [-v]\n", argv[0]);
        return 1;
    }

    // Create directories if they don't exist
    struct stat st;
    if (stat("image", &st) != 0) mkdir("image", 0700);
    if (stat("intermediate", &st) != 0) mkdir("intermediate", 0700);
    if (stat("result", &st) != 0) mkdir("result", 0700);

    // Compute the path to the input image 
    bool verbose = argc == 3 && !strcmp(argv[1], "-v");
    char *path = "image/";
    char *input_image = verbose ? argv[2] : argv[1];
    char *filePath = malloc((strlen(path)+strlen(input_image)) * sizeof(char));
    strcpy(filePath, path);
    strcat(filePath, input_image);

    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) != 0) 
    {
        fprintf(stderr, "Could not initialize SDL: %s\n", SDL_GetError());
        return 1;
    }

    // Load the image
    SDL_Surface* surface = SDL_LoadBMP(filePath);
    if (!surface) 
    {
        fprintf(stderr, "Could not load BMP file: %s\n", SDL_GetError());
        SDL_Quit();
        return 1;
    }

    // Free resources
    SDL_FreeSurface(surface);
    SDL_Quit();

    // Main processing steps
    canny(filePath, verbose);
    hough(filePath, "intermediate/canny.bmp", verbose);

    printf("\n✅ Done!%s\n", verbose ? " (using the -v option to display intermediate steps)" : "");

    return 0;
}