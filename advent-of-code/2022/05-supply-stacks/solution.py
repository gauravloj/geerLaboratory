#!/usr/bin/python3

filename = "input.txt"


def readCrates():
    crates = []
    # with open("input.txt") as infile:
    with open(filename) as infile:
        for line in infile:
            if line.strip() == "":
                break
            crates.append(line[:-1])

    return crates


def readMoves():
    with open(filename) as infile:
        for line in infile:
            if line.strip() == "":
                break

        for line in infile:
            yield line.strip()


def parseCrates(crates):
    stack_ids = []
    stacks = dict()
    curr_id = ""

    # last row contains stack ids
    # Adding an extra space at the end to parse the last id
    id_string = crates[-1] + " "

    for letter in id_string:
        if letter.isspace():
            if curr_id.isdigit():
                sid = int(curr_id)
                stack_ids.append(sid)
                stacks[sid] = []
            curr_id = ""
        else:
            curr_id += letter

    # reading crates starting from the bottom one
    for crate_row in crates[-2::-1]:
        # stack id starts from 1st index with increment of 4 indiex per stack
        for st_id, st_index in zip(stack_ids, range(1, len(crate_row), 4)):
            if crate_row[st_index].isspace():
                continue
            stacks[st_id].append(crate_row[st_index])

    return stack_ids, stacks


def sol_one(stack_ids, stacks):
    for line in readMoves():
        tokens = line.split()
        crates_to_move, from_stack, to_stack = (
            int(tokens[1]),
            int(tokens[3]),
            int(tokens[5]),
        )
        while crates_to_move > 0:
            stacks[to_stack].append(stacks[from_stack].pop())
            crates_to_move -= 1

    top_crates = ""
    for st_id in stack_ids:
        top_crates += stacks[st_id][-1]
    print(top_crates)


def sol_two(stack_ids, stacks):
    for line in readMoves():
        tokens = line.split()
        crates_to_move, from_stack, to_stack = (
            int(tokens[1]),
            int(tokens[3]),
            int(tokens[5]),
        )
        to_move = stacks[from_stack][-crates_to_move:]
        stacks[from_stack] = stacks[from_stack][:-crates_to_move]
        stacks[to_stack].extend(to_move)

        # while crates_to_move > 0:
        #     stacks[to_stack].append(stacks[from_stack].pop())
        #     crates_to_move -= 1

    top_crates = ""
    for st_id in stack_ids:
        top_crates += stacks[st_id][-1]
    print(top_crates)


crates = readCrates()
stack_ids, stacks = parseCrates(crates)
# sol_one(stack_ids, stacks)
sol_two(stack_ids, stacks)
