#ifndef CUTTING_H
#define CUTTING_H

#include <SDL2/SDL.h>
#include <stdbool.h>
#include "tools.h"

// Function prototypes
void save_rectangle(SDL_Surface* surface, Point coordinates[2], char* name);
void cutting(char* filename, Point coordinates[][2], size_t size, char* name, bool verbose);

#endif // CUTTING_H