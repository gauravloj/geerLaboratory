from functools import reduce


def readFile():
    with open("input.txt") as infile:
        for line in infile:
            yield line.strip()


char_a = "a"
char_A = "A"


def getPriority(char):
    base = char_a
    offset = 1
    if "A" <= char <= "z":
        base = char_A
        offset = 27
    return ord(char) - ord(base) + offset


# preprocessed priorities
lowercase_p = {
    chr(x): ord(chr(x)) - ord("a") + 1 for x in range(ord("a"), ord("z") + 1)
}
uppercase_p = {
    chr(x): ord(chr(x)) - ord("A") + 27 for x in range(ord("A"), ord("Z") + 1)
}
char_priority = lowercase_p | uppercase_p


def getCommonChar(rsack):
    itemcount = len(rsack)

    # start processing items from secon d half of the rucksack
    curritem = itemcount // 2

    # add all the items in first half in a set
    items_firsthf = set(rsack[:curritem])
    while curritem < itemcount:
        item = rsack[curritem]
        if item in items_firsthf:
            break
        curritem += 1

    return rsack[curritem]


def sol_one():
    total_priority = 0
    for rucksack in readFile():
        commonchar = getCommonChar(rucksack)
        total_priority += char_priority[commonchar]
    print(total_priority)


def getCommonItem(sack_list):
    commonitem = reduce(lambda a, b: a.intersection(b), sack_list)
    return commonitem.pop()


def sol_two():
    total_priority = 0
    elf_group = []

    for rucksack in readFile():
        elf_group.append(set(rucksack))
        if len(elf_group) == 3:
            commonitem = getCommonItem(elf_group)
            total_priority += char_priority[commonitem]
            elf_group = []

    print(total_priority)


# sol_one()
sol_two()
