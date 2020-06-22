"""

<Problem Description>

Write a program to solve a Sudoku puzzle by filling
the empty cells.

A sudoku solution must satisfy all of the following
rules:

- Each of the digits 1-9 must occur exactly once in
  each row.
- Each of the digits 1-9 must occur exactly once in
  each column.
- Each of the the digits 1-9 must occur exactly once
  in each of the 9 3x3 sub-boxes of the grid.
- Empty cells are indicated by the character '.'.

Note:
- The given board contain only digits 1-9 and the
  character '.'.
- You may assume that the given Sudoku puzzle will
  have a single unique solution.
- The given board size is always 9x9.

"""
from typing import List
from collections import defaultdict


class Solution:
    def solveSudoku(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """

        def fillCell(i, j):
            nextJ = 0 if j == 8 else j + 1
            nextI = i + 1 if j == 8 else i
            if board[i][j] == '.':
                possibleVals = []
                matIdx = 3 * (i // 3) + (j // 3)
                for val in range(9):
                    if rows[(i, val)] or cols[(j, val)] or matThree[(matIdx, val)]:
                        continue
                    possibleVals.append(val)

                for val in possibleVals:
                    board[i][j] = str(val + 1)
                    rows[(i, val)] = True
                    cols[(j, val)] = True
                    matThree[(matIdx, val)] = True
                    if nextI == 9:
                        return True
                    if fillCell(nextI, nextJ):
                        return True
                    else:
                        rows[(i, val)] = False
                        cols[(j, val)] = False
                        matThree[(matIdx, val)] = False
                        board[i][j] = '.'
                else:
                    return False
            else:
                if nextI < 9:
                    return fillCell(nextI, nextJ)
            return True
        boardIter = [(i, j) for i in range(9) for j in range(9)]
        rows = {x: False for x in boardIter}
        cols = {x: False for x in boardIter}
        matThree = {x: False for x in boardIter}
        for i, j in boardIter:
            val = board[i][j]
            if val != '.':
                val = int(val)
                rows[(i, val - 1)] = True
                cols[(j, val - 1)] = True
                matIdx = 3 * (i // 3) + (j // 3)
                matThree[(matIdx, val - 1)] = True
        fillCell(0, 0)

    def solveSudokuAP(self, board: List[List[str]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        rows = [{str(j+1): False for j in range(9)} for i in range(9)]
        cols = [{str(j+1): False for j in range(9)} for i in range(9)]
        boxes = [{str(j+1): False for j in range(9)} for i in range(9)]
        for i in range(9):
            for j in range(9):
                if board[i][j] != ".":
                    k = board[i][j]
                    rows[i][k] = True
                    cols[j][k] = True
                    p = (i // 3) * 3 + j // 3
                    boxes[p][k] = True
        self.solve(board, rows, cols, boxes, 0, 0)

    def solve(self, board: List[List[str]], rows: List[dict], cols: List[dict], boxes: List[dict], i: int, j: int) -> bool:
        if board[i][j] == ".":
            count = False
            p = (i // 3) * 3 + j // 3
            for k in range(1, 10):
                ks = str(k)
                if not rows[i][ks] and not cols[j][ks] and not boxes[p][ks]:
                    board[i][j] = ks
                    rows[i][ks] = True
                    cols[j][ks] = True
                    boxes[p][ks] = True
                    nj = j+1
                    ni = i
                    if nj > 8:
                        nj = 0
                        ni = ni+1
                    if ni > 8:
                        return True
                    if self.solve(board, rows, cols, boxes, ni, nj):
                        return True
                    rows[i][ks] = False
                    cols[j][ks] = False
                    boxes[p][ks] = False
                    board[i][j] = "."
        else:
            nj = j+1
            ni = i
            if nj > 8:
                nj = 0
                ni = ni+1
                if ni > 8:
                    return True
            if self.solve(board, rows, cols, boxes, ni, nj):
                return True
        return False

    def solveSudokuBacktracking(self, board):
        """
        :type board: List[List[str]]
        :rtype: void Do not return anything, modify board in-place instead.
        """
        def could_place(d, row, col):
            """
            Check if one could place a number d in (row, col) cell
            """
            return not (d in rows[row] or d in columns[col] or
                        d in boxes[box_index(row, col)])

        def place_number(d, row, col):
            """
            Place a number d in (row, col) cell
            """
            rows[row][d] += 1
            columns[col][d] += 1
            boxes[box_index(row, col)][d] += 1
            board[row][col] = str(d)

        def remove_number(d, row, col):
            """
            Remove a number which didn't lead
            to a solution
            """
            del rows[row][d]
            del columns[col][d]
            del boxes[box_index(row, col)][d]
            board[row][col] = '.'

        def place_next_numbers(row, col):
            """
            Call backtrack function in recursion
            to continue to place numbers
            till the moment we have a solution
            """
            # if we're in the last cell
            # that means we have the solution
            if col == N - 1 and row == N - 1:
                nonlocal sudoku_solved
                sudoku_solved = True
            # if not yet
            else:
                # if we're in the end of the row
                # go to the next row
                if col == N - 1:
                    backtrack(row + 1, 0)
                # go to the next column
                else:
                    backtrack(row, col + 1)

        def backtrack(row=0, col=0):
            """
            Backtracking
            """
            # if the cell is empty
            if board[row][col] == '.':
                # iterate over all numbers from 1 to 9
                for d in range(1, 10):
                    if could_place(d, row, col):
                        place_number(d, row, col)
                        place_next_numbers(row, col)
                        # if sudoku is solved, there is no need to backtrack
                        # since the single unique solution is promised
                        if not sudoku_solved:
                            remove_number(d, row, col)
            else:
                place_next_numbers(row, col)

        # box size
        n = 3
        # row size
        N = n * n
        # lambda function to compute box index
        def box_index(row, col): return (row // n) * n + col // n

        # init rows, columns and boxes
        rows = [defaultdict(int) for i in range(N)]
        columns = [defaultdict(int) for i in range(N)]
        boxes = [defaultdict(int) for i in range(N)]
        for i in range(N):
            for j in range(N):
                if board[i][j] != '.':
                    d = int(board[i][j])
                    place_number(d, i, j)

        sudoku_solved = False
        backtrack()

    def printSudoku(self, board: List[List[str]]) -> None:
        for row in board:
            print(row)

    def solveSudokuProfile(self, board):
        import cProfile
        import tracemalloc
        tracemalloc.start()
        cProfile.runctx('self.solveSudoku(board)',
                        globals=globals(), locals=locals())
        snapshot = tracemalloc.take_snapshot()
        top_stats = snapshot.statistics('lineno')

        print("[ Top 10 ]")
        for stat in top_stats[:10]:
            print(stat)


def main():
    inputStrings = [
        [
            [".", ".", "9", "7", "4", "8", ".", ".", "."],
            ["7", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", "2", ".", "1", ".", "9", ".", ".", "."],
            [".", ".", "7", ".", ".", ".", "2", "4", "."],
            [".", "6", "4", ".", "1", ".", "5", "9", "."],
            [".", "9", "8", ".", ".", ".", "3", ".", "."],
            [".", ".", ".", "8", ".", "3", ".", "2", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "6"],
            [".", ".", ".", "2", "7", "5", "9", ".", "."]
        ]
    ]

    def readlines():
        for line in inputStrings:
            yield line

    lines = readlines()
    while True:
        try:
            board = next(lines)
            solObj = Solution()

            solObj.solveSudokuProfile(board)
            # solObj.printSudoku(board)

        except StopIteration:
            break


if __name__ == '__main__':
    main()
