#!/usr/bin/python3

with open("./input.txt") as f:
    content = f.readlines()

    max_cal = 0
    cur_sum = 0
    cal_per_elf = []
    for line in content:
        cal = line.strip()
        if cal.isdigit():
            cur_sum += int(cal)
        else:
            max_cal = max(max_cal, cur_sum)
            cal_per_elf.append(cur_sum)
            cur_sum = 0

print(max_cal)
print(sum(sorted(cal_per_elf, reverse=True)[:3]))
