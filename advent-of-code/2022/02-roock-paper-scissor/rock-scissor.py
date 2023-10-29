# A, B, C mapping
# opponent_hand_map = {"A": "rock", "B": "paper", "C": "scissor"}

# X, Y, Z mapping for part 1
# my_hand_map = {"X": "rock", "Y": "paper", "Z": "scissor"}

# score = {"rock": 1, "paper": 2, "scissor": 3}
score = {"A": 1, "B": 2, "C": 3, "X": 1, "Y": 2, "Z": 3}
LOSE = 0
DRAW = 3
WIN = 6

round_result_map = {
    "X": {"A": DRAW, "B": LOSE, "C": WIN},
    "Y": {"A": WIN, "B": DRAW, "C": LOSE},
    "Z": {"A": LOSE, "B": WIN, "C": DRAW},
}

# X, Y, Z mapping for part two
round_map_two = {"X": LOSE, "Y": DRAW, "Z": WIN}
round_hand_map = {
    "A": {"X": "C", "Y": "A", "Z": "B"},
    "B": {"X": "A", "Y": "B", "Z": "C"},
    "C": {"X": "B", "Y": "C", "Z": "A"},
}

# inputj file format
# opponent_hand my_hand
# A X
# B Y
# C Z


def sol_part_one():
    with open("input.txt") as infile:
        total_score = 0
        for line in infile:
            opponent_hand, my_hand = line.strip().split()
            result = round_result_map[my_hand][opponent_hand]
            total_score += score[my_hand] + result
        print(total_score)


def sol_part_two():
    with open("input.txt") as infile:
        total_score = 0
        for line in infile:
            opponent_hand, expected_result = line.strip().split()
            my_hand = round_hand_map[opponent_hand][expected_result]
            result = round_map_two[expected_result]
            total_score += score[my_hand] + result
        print(total_score)


# sol_part_one()
sol_part_two()
