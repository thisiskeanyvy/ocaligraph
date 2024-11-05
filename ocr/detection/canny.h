#ifndef CANNY_H
#define CANNY_H

#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <math.h>
#include <SDL2/SDL.h>
#include <err.h>

// Function prototypes
double **createGaussianMask(int size, double sigma);
void applyFilter(double **image, double **mask, int imageWidth, int imageHeight, int maskSize, double **result);
int toNormalizeDegreeAngle(double angle);
void magnitudesAndAngles(double **image, int imageWidth, int imageHeight, double **gradientMagnitude, int **degreeAngles);
void getValidNeighbors(int angle, double** gradientMagnitude, double *neighbor1, double *neighbor2, int imageHeight, int imageWidth, int x, int y);
void nonMaxSuppression(double **gradientMagnitude, int **degreeAngles, double **nonMaximum, int imageHeight, int imageWidth);
void hysteresisThresholding(double **nonMaximum, int **degreeAngles, double **edges, int imageHeight, int imageWidth, double highThreshold, double lowThreshold);
void canny(char *filename, bool verbose);

#endif // CANNY_H