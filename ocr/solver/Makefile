# Makefile

CC = gcc
CPPFLAGS =
CFLAGS = -Wall -Wextra
LDFLAGS =
LDLIBS =

all: solver

SRC = solver.c
OBJ = ${SRC:.c=.o}
EXE = ${SRC:.c=}

solver: solver.o

.PHONY: clean

clean:
	${RM} ${OBJ}
	${RM} ${EXE}

# END
