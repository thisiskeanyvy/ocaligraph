# Makefile

CC = gcc
CPPFLAGS =
CFLAGS = -Wall -Wextra -O3 `pkg-config --cflags sdl2 SDL2_image` -D__NO_INLINE__
LDFLAGS =
LDLIBS = `pkg-config --libs sdl2 SDL2_image` -lm

all: pretreatment

SRC = pretreatment.c
OBJ = ${SRC:.c=.o}
EXE = ${SRC:.c=}

.PHONY: clean

clean:
	${RM} ${OBJ}
	${RM} ${EXE}

# END

