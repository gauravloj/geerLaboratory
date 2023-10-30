#!/usr/bin/python3
from collections import deque


def readFile():
    with open("input.txt") as infile:
        for line in infile:
            yield line.strip()


def sol_one():
    # reading only one line as there is only one line in the input file
    inbuffer = next(readFile())
    buf_len = len(inbuffer)
    last_four = deque()
    i = 0
    while i < 4:
        last_four.append(inbuffer[i])
        i += 1
    while i < buf_len:
        if len(set(last_four)) == len(last_four):
            break
        last_four.popleft()
        last_four.append(inbuffer[i])
        i += 1
    print(i)


def sol_two():
    # reading only one line as there is only one line in the input file
    inbuffer = next(readFile())
    buf_len = len(inbuffer)
    last_four = deque()
    i = 0
    while i < 14:
        last_four.append(inbuffer[i])
        i += 1
    while i < buf_len:
        if len(set(last_four)) == len(last_four):
            break
        last_four.popleft()
        last_four.append(inbuffer[i])
        i += 1
    print(i)


# sol_one()
sol_two()
