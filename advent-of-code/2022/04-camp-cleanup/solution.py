#!/usr/bin/python3


def readFile():
    with open("input.txt") as infile:
        for line in infile:
            pr_one, pr_two = line.strip().split(",")
            start_one, end_one = pr_one.split("-")
            start_two, end_two = pr_two.split("-")
            yield (int(start_one), int(end_one), int(start_two), int(end_two))


def sol_one():
    total_overlap = 0
    for st_1, end_1, st_2, end_2 in readFile():
        if (st_1 >= st_2 and end_1 <= end_2) or (st_2 >= st_1 and end_2 <= end_1):
            total_overlap += 1
    print(total_overlap)


def sol_two():
    total_overlap = 0
    for st_1, end_1, st_2, end_2 in readFile():
        if st_2 <= st_1 <= end_2:
            total_overlap += 1
        elif st_1 <= st_2 <= end_1:
            total_overlap += 1
        elif st_1 <= end_2 <= end_1:
            total_overlap += 1
        elif st_2 <= end_1 <= end_2:
            total_overlap += 1

    print(total_overlap)


# sol_one()
sol_two()
