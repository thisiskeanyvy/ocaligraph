#include <stdio.h>
#include <stdlib.h>
#include <string.h>

void help() {
	printf("OCaligraph v1.0 ( https://ocaligraph.com )\n"
       "Usage: ocaligraph [Scan Type(s)] [Options] {target specification}\n"
       "TARGET SPECIFICATION:\n"
       "SEE THE MAN PAGE (https://ocaligraph.com/fr/ocr/man) FOR MORE OPTIONS AND EXAMPLES\n");
}

int main(int argc, char* argv[]) {
	if(argc == 1) {
		help();
	} else {
		for(int i = 1; i < argc; i++) {
			if(strcmp(argv[i],"--help") == 0) {
				help();
			}
		}
	}
	return 0;
}