# Makefile

TARGET = detection
CFLAGS = -Wall -Wextra
LDFLAGS = -lm -lSDL2 -lSDL2_image
SRC = detection.c canny.c hough.c cutting.c
OBJ = $(SRC:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^ $(LDFLAGS)

canny: canny.o
	$(CC) $(CFLAGS) -o canny canny.o $(LDFLAGS)

hough: hough.o
	$(CC) $(CFLAGS) -o hough hough.o $(LDFLAGS)

cutting: cutting.o
	$(CC) $(CFLAGS) -o cutting cutting.o $(LDFLAGS)


%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(TARGET) canny hough cutting
	rm -f intermediate/* result/*

# END
