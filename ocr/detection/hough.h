#ifndef HOUGH_H
#define HOUGH_H

#include <stdbool.h>
#include <SDL2/SDL.h>
#include "tools.h"

// Function prototypes
double calculateDensity(double **image, int imageHeight, int imageWidth, BoundingBox bbox);
bool isolatedPoint(double **image, Point point);
int **hough(char* filename, char* cannyFile, bool verbose);

#endif // HOUGH_H