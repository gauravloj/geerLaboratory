

# CC = clang
CC = gcc
CFLAGS = -g -Wall -std=c99
BIN = testlib libmycode.so libstaticmycode.a 

all: $(BIN)

libmycode.o: libmycode.c mycode.h
	$(CC) $(CFLAGS) -c libmycode.c

libmycode.so: libmycode.c mycode.h
	$(CC) $(CFLAGS) -shared -fPIC -o $@ libmycode.c -lc

libstaticmycode.a: libmycode.o
	ar rcs libstaticmycode.a libmycode.o

testlib: testlib.c libmycode.o
	$(CC) $(CFLAGS) -o $@ $^

runtime_testlib: testlib
	$(CC) $(CFLAGS) -v -o $@ $^ -L. -lmycode

static_testlib: testlib libstaticmycode.a
	$(CC) $(CFLAGS) -v -o $@ $^ -L. -lstaticmycode

clean:
	rm -rf *.o *.dSYM $(BIN)
