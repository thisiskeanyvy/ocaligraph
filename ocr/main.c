#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//include local
// #include "rotation/rotation.c" //SDL Import
//#include "pretreatment/pretreatment.c" //SDL Import
#include "train/train.c"
#include "solver/solver.c"
//#include "detection/detection.c"

void help() {
	printf("OCaligraph v1.0 ( https://ocaligraph.com )\n"
       "Usage: ocaligraph [Scan Type(s)] [Options] {target specification}\n"
       "TARGET SPECIFICATION:\n"
       "  --solver; -s FILE WORD: Use the solver to find a word\n"
       "  --pretreatment; -p IMAGE: Use the pretreatment on a image\n"
       "  --rotation; -r IMAGE ANGLE: Use the rotation on a image\n"
       "  --detection; -d <input image> [-v]: Use the detection on a image\n"
       "  --train; -t <input image> [-v]: Use the neural network to train\n"
       "MISC:\n"
       "  --help; -h: Print this help summary page.\n"
       "EXAMPLES:\n"
       "  ./ocaligraph -s solver/grid HORIZONTAL\n"
       "  ./ocaligraph --pretreatment IMAGE\n"
       "  ./ocaligraph --rotation IMAGE ANGLE\n"
       "  ./ocaligraph -d <input image> [-v]\n"
       "  ./ocaligraph --train\n"
       "SEE THE MAN PAGE (https://ocaligraph.com/fr/ocr/man) FOR MORE OPTIONS AND EXAMPLES\n");
}

int main(int argc, char* argv[]) {
	if(argc == 1) {
		help();
	} else {
		for(int i = 1; i < argc; i++) {
			// menu en fct des arguments
			if(strcmp(argv[i],"--help") == 0 || strcmp(argv[i],"-h") == 0) { // commande = --help
				help();
				exit(0);
			} else {
				if(strcmp(argv[i],"--solver") == 0 || strcmp(argv[i],"-s") == 0) { //commande = --solver
					argv[1] = argv[2];
					argv[2] = argv[3];
					solver(argc-1, argv);
					exit(0);
				} else {
					if(strcmp(argv[i],"--pretreatment") == 0 || strcmp(argv[i],"-p") == 0) { //commande = --solver
						help(); // temporaire
						exit(0);
					} else {
						if(strcmp(argv[i],"--rotation") == 0 || strcmp(argv[i],"-r") == 0) { //commande = --solver
							help(); // temporaire
							exit(0);
						} else {
							if(strcmp(argv[i],"--detection") == 0 || strcmp(argv[i],"-d") == 0) {
								help(); // temporaire
								exit(0);
							} else {
								if(strcmp(argv[i],"--train") == 0 || strcmp(argv[i],"-t") == 0) {
									train();
									exit(0);
								} else {
									printf("ocaligraph: unrecognized option '%s'\nSee the output of ocaligraph -h for a summary of options.\n",argv[1]);
								}
							}
						}
					}
				}
			}
		}
	}
	return 0;
}
