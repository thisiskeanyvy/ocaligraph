CC := gcc
CFLAGS := -Wall -Wextra -pedantic -std=c99
OBJS = main.o
TARGET = ocaligraph
COMMANDS = -o ocaligraph -lm

$(TARGET): $(OBJS)
	$(CC) $(OBJS) $(COMMANDS)

.PHONY: clean
clean:
	$(RM) $(OBJS) $(TARGET)