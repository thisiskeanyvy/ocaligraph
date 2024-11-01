CC := gcc
CFLAGS := -Wall -Wextra -pedantic -std=c99
OBJS = main.o
TARGET = main
COMMANDS = -o main

$(TARGET): $(OBJS)
	$(CC) $(OBJS) $(COMMANDS)

.PHONY: clean
clean:
	$(RM) $(OBJS) $(TARGET)