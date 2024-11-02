#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// Define constants for maximum sizes
#define MAX_GRID_SIZE 100   // Maximum size of the wordsearch grid
#define MAX_WORD_LENGTH 50  // Maximum length of a word to search
#define MAX_POSITIONS 1000  // Maximum number of starting positions for a word

// Structure to represent a position in the grid
typedef struct {
	int x;  // Row index
	int y;  // Column index
} Position;

// Global variables
char wordsearch[MAX_GRID_SIZE][MAX_GRID_SIZE];  // 2D array to store the wordsearch grid
int rows, cols;  // Dimensions of the wordsearch grid

/**
 * Check if a given position is within the grid boundaries
 * line_num Row index
 * col_num Column index
 * return 1 if valid, 0 if not
 */
int is_valid_index(int line_num, int col_num) {
	return (line_num >= 0 && line_num < rows && col_num >= 0 && col_num < cols);
}

/**
 * Check if the characters found match the beginning of the word
 * found Array of characters found in the grid
 * word Word being searched for
 * found_len Length of the found characters
 * return 1 if match, 0 if not
 */

int chars_match(const char* found, const char* word, int found_len) {
	for (int i = 0; i < found_len; i++) {
		if (found[i] != word[i]) {
			return 0;
		}
	}
	return 1;
}

/**
 * Print coordinates depending on the directions dx and dy
 * sx Start X
 * sy Start Y
 * ex End X
 * ey End Y
 * dx X direction (-1, 0, or 1)
 * dy Y direction (-1, 0, or 1)
 */
void print_coord(int sx, int sy, int ex, int ey, int dx, int dy) {
	if (dx == -1 && dy == 1) {
		printf("(%i,%i)(%i,%i)\n",ey,ex,sy,sx);
	}
	if (dx == 0 && dy == 1) {
		printf("(%i,%i)(%i,%i)\n",sy,sx,ey,ex);
	}
	if (dx == 1 && dy == 1) {
		printf("(%i,%i)(%i,%i)\n",sy,sx,ey,ex);
	}
	if (dx == -1 && dy == 0) {
		printf("(%i,%i)(%i,%i)\n",ey,ex,sy,sx);
	}
	if (dx == 1 && dy == 0) {
		printf("(%i,%i)(%i,%i)\n",sy,sx,ey,ex);
	}
	if (dx == -1 && dy == -1) {
		printf("(%i,%i)(%i,%i)\n",ey,ex,sy,sx);
	}
	if (dx == 0 && dy == -1) {
		printf("(%i,%i)(%i,%i)\n",ey,ex,sy,sx);
	}
	if (dx == 1 && dy == -1) {
		printf("(%i,%i)(%i,%i)\n",sy,sx,ey,ex);
	}
}

/**
 * Check if the word exists in a specific direction from a starting position
 * word Word to search for
 * start_pos Starting position
 * dx X direction (-1, 0, or 1)
 * dy Y direction (-1, 0, or 1)
 * return 1 if word found, 0 if not
 */
int check_dir(const char* word, Position start_pos, int dx, int dy) {
	char found_chars[MAX_WORD_LENGTH];
	Position current_pos = start_pos;
	Position positions[MAX_WORD_LENGTH];
	int pos_count = 0;
	int word_len = strlen(word);
	int final[2 * MAX_WORD_LENGTH];
	int index = 0;

	found_chars[0] = wordsearch[start_pos.x][start_pos.y];
	positions[pos_count] = start_pos;
	pos_count++;
	
	for (int i = 1; i < word_len; i++) {
		current_pos.x += dx;
		current_pos.y += dy;
		if (!is_valid_index(current_pos.x, current_pos.y)) {
			return 0;
		}

		found_chars[i] = wordsearch[current_pos.x][current_pos.y];
		positions[pos_count] = current_pos;
		pos_count++;

		if (!chars_match(found_chars, word, i + 1)) {
			return 0;
		}
	}

	// Word found, print the coordinates
	for (int x = 0; x < rows; x++) {
		for (int y = 0; y < cols; y++) {
			for (int z = 0; z < pos_count; z++) {
				if (positions[z].x == x && positions[z].y == y) {
					final[index] = x;
					index++;
					final[index] = y;
					index++;
				}
			}
		}
	}

	print_coord(final[0],final[1],final[index - 2],final[index - 1],dx,dy);
	return 1;
}

/**
 * Check all 8 directions from a starting position for the word
 * word Word to search for
 * start_pos Starting position
 * return 1 if word found in any direction, 0 if not
 */
int check_start(const char* word, Position start_pos) {
	int directions[8][2] = {{-1,1}, {0,1}, {1,1}, {-1,0}, {1,0}, {-1,-1}, {0,-1}, {1,-1}};
	for (int i = 0; i < 8; i++) {
		if (check_dir(word, start_pos, directions[i][0], directions[i][1])) {
			return 1;
		}
	}
	return 0;
}

/**
 * Find a word in the wordsearch grid
 * word Word to search for
 */
void find_word(const char* word) {
	Position start_pos[MAX_POSITIONS];
	int start_pos_count = 0;
	char first_char = word[0];

	// Find all positions of the first character of the word
	for (int i = 0; i < rows; i++) {
		for (int j = 0; j < cols; j++) {
			if (wordsearch[i][j] == first_char) {
				start_pos[start_pos_count].x = i;
				start_pos[start_pos_count].y = j;
				start_pos_count++;
			}
		}
	}

	// Check each starting position for the word
	for (int i = 0; i < start_pos_count; i++) {
		if (check_start(word, start_pos[i])) {
			return;
		}
	}
	printf("Not found\n");
}

int main(int argc, char* argv[]) {

	if (argc != 3) {
		printf("USAGE : ./solver FILE WORD\n");
		return 0;
	}
	char *filename;
	char *word;
	char line[MAX_GRID_SIZE];
	// Get the filename from the user
	filename = argv[1];
	// Open and read the file
	FILE *file = fopen(filename, "r");
	if (file == NULL) {
		printf("Unable to open file.\n");
		return 1;
	}

	// Read the wordsearch grid from the file
	rows = 0;
	while (fgets(line, sizeof(line), file) && rows < MAX_GRID_SIZE) {
		cols = strlen(line) - 1;  // -1 to remove newline
		for (int i = 0; i < cols; i++) {
			wordsearch[rows][i] = toupper(line[i]);
		}
		rows++;
	}

	fclose(file);

	// Get the word to search
	word = argv[2];

	// Convert word to uppercase for case-insensitive search
	for (int i = 0; word[i]; i++) {
		word[i] = toupper(word[i]);
	}

	find_word(word);
	return 0;
}
