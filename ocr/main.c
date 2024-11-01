#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void help() {
	printf("menu");
}

int main(int argc, char* argv[]) {
	for(int i = 1; i < argc; i++) {
		if(strcmp(argv[i],"--help") == 0) {
			help();
		}
	}
	return 0;
}