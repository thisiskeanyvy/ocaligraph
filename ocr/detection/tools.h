#ifndef TOOLS_H
#define TOOLS_H


// Define a structure to hold a point
typedef struct
{
    int x;
    int y;
}Point;

// Define a structure to hold a bounding box
typedef struct 
{
    Point topLeft;
    Point bottomRight;
} BoundingBox;

#endif // TOOLS_H