CC = gcc
CFLAGS = -Wall -Wextra -O2 -pedantic -std=c99
LIBS = -lm
TARGET = train
SRCS = train.c
OBJS = $(SRCS:.c=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CC) $(CFLAGS) -o $@ $^ $(LIBS)

%.o: %.c
	$(CC) $(CFLAGS) -c $<

.PHONY: clean
clean:
	$(RM) $(OBJS) $(TARGET)