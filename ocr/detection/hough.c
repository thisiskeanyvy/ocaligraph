#include <err.h>
#include <math.h>
#include <stdbool.h>
#include "tools.h"
#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include "cutting.h"

#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>

// Calculate the density of white pixels within a given bounding box in an image
double calculateDensity(double **image, int imageHeight, int imageWidth, BoundingBox bbox) 
{
    int totalPixels = 0;
    int whitePixels = 0;

    // Check if the bounding box is within the image boundaries
    if (bbox.topLeft.x < 0 || bbox.topLeft.y < 0 || bbox.bottomRight.x >= imageWidth || bbox.bottomRight.y >= imageHeight) 
    {
        return -2; // flag for invalid bounding box
    }

    // Iterate over the pixels in the bounding box
    for (int y = bbox.topLeft.y; y <= bbox.bottomRight.y; y++) 
    {
        for (int x = bbox.topLeft.x; x <= bbox.bottomRight.x; x++) 
        {
            totalPixels++;
            if (image[y][x] > 0) 
            {
                whitePixels++;
            }
        }
    }

    return (double)whitePixels / (double)totalPixels;
}

// Check if a point is isolated (not surrounded by many white pixels) in an image
bool isolatedPoint(double **image, Point point)
{
    int count = 0;
    // Check a 7x7 grid around the point (3 pixels in each direction)
    for (int y = point.y - 3; y <= point.y + 3; y++)
    {
        for (int x = point.x - 3; x <= point.x + 3; x++)
        {
            if (image[y][x] > 0)
            {
                count++;
            }
        }
    }
    return count < 5;
}

int **hough(char* filename, char* cannyFile, bool verbose)
{
    if (verbose) printf("\n🔍 Grid detection...\n");

    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) < 0) errx(EXIT_FAILURE, "%s", SDL_GetError());

    // Load images
    SDL_Surface *inputImage = SDL_LoadBMP(filename);
    SDL_Surface *cannyImage = SDL_LoadBMP(cannyFile);
    if (!inputImage || !cannyImage)
    {
        SDL_Quit();
        errx(EXIT_FAILURE, "%s", SDL_GetError());
    }

    int imageWidth = cannyImage->w;
    int imageHeight = cannyImage->h;
    // Create 2D arrays to store the image data and canny image.
    // Assumes sufficient memory is available
    double **imageSrc = malloc(imageHeight * sizeof(double *));
    double **image = malloc(imageHeight * sizeof(double *));
    for (int x = 0; x < imageHeight; x++)
    {
        imageSrc[x] = malloc(imageWidth * sizeof(double));
        image[x] = malloc(imageWidth * sizeof(double));
        for (int y = 0; y < imageWidth; y++)
        {
            Uint8 *pixel1 = (Uint8 *)inputImage->pixels + x * inputImage->pitch + y;
            imageSrc[x][y] = (double)(*pixel1);
            Uint8 *pixel2 = (Uint8 *)cannyImage->pixels + x * cannyImage->pitch + y;
            image[x][y] = (double)(*pixel2);
        }
    }

    if (verbose) printf("📍 Find the barycentre...\n");
    // Find the barycentre of the white pixels in the image
    int sumX = 0;
    int sumY = 0;
    int sumWhite = 0;
    for (int y = 0; y < imageHeight; y++) 
    {
        for (int x = 0; x < imageWidth; x++) 
        {
            if (image[y][x] > 0) 
            {
                sumX += x;
                sumY += y;
                sumWhite++;
            }
        }
    }
    Point barycentre;
    if (sumWhite == 0) 
    {
        // If no white pixels are found, set the barycentre to the center of the image
        barycentre.x = (int)(imageWidth / 2.0);
        barycentre.y = (int)(imageHeight / 2.0);
    } 
    else 
    {
        barycentre.x = (int)(sumX / (double)sumWhite);
        barycentre.y = (int)(sumY / (double)sumWhite);
    }


    int x = barycentre.x;
    int y = barycentre.y;


    if (verbose) printf("🔠 Find a letter...\n");
    // Find a white pixel to start the boundary following algorithm

    // Direction arrays for moving right, down, left, up
    int directionX[] = {1, 0, -1, 0};
    int directionY[] = {0, 1, 0, -1};
    
    int steps = 1;   // Number of steps to take in each direction
    int dir = 0;     // Index for current direction
    int count = 0;
    
    // Keep moving until a valid pixel is found
    while (image[y][x] == 0 || isolatedPoint(image, (Point){x, y}))
    {
        for (int i = 0; i < 2; i++) // Repeat the current direction twice before increasing steps count
        {
            int j = 0;
            while (j < steps && (image[y][x] == 0 || isolatedPoint(image, (Point){x, y})))
            {
                x += directionX[dir];
                y += directionY[dir];
                count++;
                j++;
            }
            dir = (dir + 1) % 4;  // Change to the next direction
        }
        steps++;
    }
    // Adjust the position to switch from the Canny image to the source image
    if (imageSrc[y][x] == 1)
    {
        for (int i = -3; i < 4; i++)
        {
            for (int j = -3; j < 4; j++)
            {
                if (imageSrc[y][x] == 1 && imageSrc[y + i][x + j] == 0)
                {
                    x = x + j;
                    y = y + i;
                }
            }
        }
    }


    if (verbose) printf("🔲 Determine its bounding box...\n");

    // Determine the bounding box of the letter of the found pixel

    // Initialize bounding box around the found pixel
    BoundingBox box = {{x, y}, {x, y}};
    bool visited[imageHeight][imageWidth];  // Array to track visited pixels

    // Initialize the visited array
    for (int i = 0; i < imageHeight; i++)
        for (int j = 0; j < imageWidth; j++)
            visited[i][j] = false;

    // Stack for storing pixels to explore
    Point stack[imageWidth * imageHeight];
    int stackSize = 0;

    // Push the starting point onto the stack
    stack[stackSize++] = (Point){x, y};

    while (stackSize > 0) 
    {
        // Pop the top point from the stack
        Point current = stack[--stackSize];
        int x2 = current.x;
        int y2 = current.y;

        // Check bounds and if the pixel has already been visited
        if (x2 < 0 || x2 >= imageWidth || y2 < 0 || y2 >= imageHeight || visited[y2][x2] || imageSrc[y2][x2] > 0) 
        {
            continue;
        }
        visited[y2][x2] = true;

        // Update the coordinates of the bounding box
        if (x2 < box.topLeft.x) box.topLeft.x = x2;
        if (x2 > box.bottomRight.x) box.bottomRight.x = x2;
        if (y2 < box.topLeft.y) box.topLeft.y = y2;
        if (y2 > box.bottomRight.y) box.bottomRight.y = y2;

        // Push the neighboring pixels onto the stack (right, left, down, up)
        stack[stackSize++] = (Point){x2 + 1, y2};
        stack[stackSize++] = (Point){x2 - 1, y2};
        stack[stackSize++] = (Point){x2, y2 + 1};
        stack[stackSize++] = (Point){x2, y2 - 1};
    }

    // Determine the size of the square based on the larger of the two dimensions
    int width = box.bottomRight.x - box.topLeft.x;
    int height = box.bottomRight.y - box.topLeft.y;
    int size = (width > height) ? width : height;
    if (height > width) 
    {
        box.topLeft.x -= (height - width) / 2;
        box.bottomRight.x += (height - width) / 2 + (height - width) % 2;
    } 
    else 
    {
        box.topLeft.y -= (width - height) / 2;
        box.bottomRight.y += (width - height) / 2 + (width - height) % 2;
    }

    // Expand the bounding box by 4 pixels in each direction to handle offset between Canny and source images
    box.topLeft.x -= 4;
    box.topLeft.y -= 4;
    box.bottomRight.x += 4;
    box.bottomRight.y += 4;


    if (verbose) printf("📐 Calculating the grid boundaries...\n");

    // Calculate the number of letters in each direction (up, down, left, right) and its position

    int nb_letters[4] = {0,0,0,0}; //up down left right

    // to merge in a function
    BoundingBox boxGrid = {{box.topLeft.x,box.topLeft.y},{box.bottomRight.x,box.bottomRight.y}};
    // up
    BoundingBox box1 = box;
    BoundingBox box2 = box;
    bool end = false;
    while (!end)
    {
        int count = 0;
        double maxDensity = -1;
        double density = 0;
        box2.topLeft.y -= 1*size;
        box2.bottomRight.y -= 1*size;
        density = calculateDensity(image, imageHeight, imageWidth, box2);
        
        while (density != -2 && box2.topLeft.y > box1.topLeft.y - 2.7*size && (density < 0.06 || density >= maxDensity)) 
        {
            if (density == maxDensity)
            {
                count++;
            } 
            else if (density > maxDensity)
            {
                maxDensity = density;
                count = 0;
            }
            box2.topLeft.y -= 2;
            box2.bottomRight.y -= 2;
            density = calculateDensity(image, imageHeight, imageWidth, box2);
        }
        box2.topLeft.y += count;
        box2.bottomRight.y += count;
        if (box2.topLeft.y <= box1.topLeft.y - 2.7*size || density == -2)
        {
            box2 = box1;
            end = true;
            break;
        }
        else
        {
            boxGrid.topLeft.y = box2.topLeft.y;
            box1 = box2;
            nb_letters[0]++;
        }
    }

    // down
    box1 = box;
    box2 = box;
    end = false;
    while (!end)
    {
        int count = 0;
        double maxDensity = -1;
        double density = 0;
        box2.topLeft.y += 1*size;
        box2.bottomRight.y += 1*size;
        density = calculateDensity(image, imageHeight, imageWidth, box2);
        
        while (density != -2 && box2.topLeft.y < box1.topLeft.y + 2.7*size && (density < 0.06 || density >= maxDensity)) 
        {
            if (density == maxDensity)
            {
                count++;
            } 
            else if (density > maxDensity)
            {
                maxDensity = density;
                count = 0;
            }
            box2.topLeft.y += 2;
            box2.bottomRight.y += 2;
            density = calculateDensity(image, imageHeight, imageWidth, box2);
        }
        box2.topLeft.y -= count;
        box2.bottomRight.y -= count;
        if (box2.topLeft.y >= box1.topLeft.y + 2.7*size || density == -2)
        {
            box2 = box1;
            end = true;
            break;
        }
        else
        {
            boxGrid.bottomRight.y = box2.bottomRight.y;
            box1 = box2;
            nb_letters[1]++;
        }
    }

    // left
    box1 = box;
    box2 = box;
    end = false;
    while (!end)
    {
        int count = 0;
        double maxDensity = -1;
        double density = 0;
        box2.topLeft.x -= 1*size;
        box2.bottomRight.x -= 1*size;
        density = calculateDensity(image, imageHeight, imageWidth, box2);
        
        while (density != -2 && box2.topLeft.x > box1.topLeft.x - 2.7*size && (density < 0.06 || density >= maxDensity)) 
        {
            if (density == maxDensity)
            {
                count++;
            } 
            else if (density > maxDensity)
            {
                maxDensity = density;
                count = 0;
            }
            box2.topLeft.x -= 2;
            box2.bottomRight.x -= 2;
            density = calculateDensity(image, imageHeight, imageWidth, box2);
        }
        box2.topLeft.x += count;
        box2.bottomRight.x += count;
        if (box2.topLeft.x <= box1.topLeft.x - 2.7*size || density == -2)
        {
            box2 = box1;
            end = true;
            break;
        }
        else
        {
            boxGrid.topLeft.x = box2.topLeft.x;
            box1 = box2;
            nb_letters[2]++;
        }
    }

    // right
    box1 = box;
    box2 = box;
    end = false;
    while (!end)
    {
        int count = 0;
        double maxDensity = -1;
        double density = 0;
        box2.topLeft.x += 1*size;
        box2.bottomRight.x += 1*size;
        density = calculateDensity(image, imageHeight, imageWidth, box2);
        
        while (density != -2 && box2.topLeft.x < box1.topLeft.x + 2.7*size && (density < 0.06 || density >= maxDensity)) 
        {
            if (density == maxDensity)
            {
                count++;
            } 
            else if (density > maxDensity)
            {
                maxDensity = density;
                count = 0;
            }
            box2.topLeft.x += 2;
            box2.bottomRight.x += 2;
            density = calculateDensity(image, imageHeight, imageWidth, box2);
        }
        box2.topLeft.x -= count;
        box2.bottomRight.x -= count;
        if (box2.topLeft.x >= box1.topLeft.x + 2.7*size || density == -2)
        {
            box2 = box1;
            end = true;
            break;
        }
        else
        {
            boxGrid.bottomRight.x = box2.bottomRight.x;
            box1 = box2;
            nb_letters[3]++;
        }
    }

    for (int i = 0; i < 8; i++)
    {
        if(boxGrid.topLeft.x > 0) boxGrid.topLeft.x--;
        if(boxGrid.topLeft.y > 0) boxGrid.topLeft.y--;
        if(boxGrid.bottomRight.x < imageWidth - 1) boxGrid.bottomRight.x++;
        if(boxGrid.bottomRight.y < imageHeight - 1) boxGrid.bottomRight.y++;
    }

    if (verbose) printf("\n🔍 Cutting and saving...\n");
    // Check if the directory exists
    if (access("result", F_OK) == 0)
    {
        // Remove the directory and all its contents
        system("rm -rf result");
    }
    // Recreate the empty directory with the desired permissions
    mkdir("result", 0700);

    // Save the grid bounding box
    Point gridCoordinates[1][2] = { {{boxGrid.topLeft.x, boxGrid.topLeft.y}, {boxGrid.bottomRight.x, boxGrid.bottomRight.y}} };

    cutting(filename, gridCoordinates, 1, "Grid", verbose);

    // Save the bounding box of grid letters
    int gridHeight = nb_letters[0] + nb_letters[1] + 1;
    int gridWidth = nb_letters[2] + nb_letters[3] + 1;
    int gridSize = gridHeight * gridWidth;
    int w = (boxGrid.bottomRight.x - boxGrid.topLeft.x) / gridWidth;
    int h = (boxGrid.bottomRight.y - boxGrid.topLeft.y) / gridHeight;
    Point lettersCoordinates[gridSize][2];
    Point point;
    for (int i = 0; i < gridHeight; i++)
    {
        for (int j = 0; j < gridWidth; j++)
        {
            point.x = boxGrid.topLeft.x + j * w;
            point.y = boxGrid.topLeft.y + i * h;
            lettersCoordinates[i * gridWidth + j][0] = point;
            point.x = boxGrid.topLeft.x + (j + 1) * w;
            point.y = boxGrid.topLeft.y + (i + 1) * h;
            lettersCoordinates[i * gridWidth + j][1] = point;
        }
    }
    cutting(filename, lettersCoordinates, gridSize, "gridLetter", verbose);

    // free resources
    for (int i = 0; i < imageHeight; i++) 
    {
            free(image[i]);
            free(imageSrc[i]);
    }
    free(image);
    free(imageSrc);
    
    return 0;
}