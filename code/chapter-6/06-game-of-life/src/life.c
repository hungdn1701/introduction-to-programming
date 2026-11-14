/* life.c - Conway's Game of Life (Gardner, Mathematical Games, Scientific
 * American, October 1970) on an 8 x 8 grid; cells outside the grid count as
 * dead. Prints generations 0 to 4 side by side.
 * Usage: life glider | life blinker | life inplace (glider, WRONG update)
 *        life glider 20 (run 20 generations first, then draw 20 to 24) */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define ROWS 8
#define COLS 8
#define GENS 5

int count_neighbors(int grid[ROWS][COLS], int i, int j)
{
    int count = 0;
    for (int di = -1; di <= 1; di++)
        for (int dj = -1; dj <= 1; dj++) {
            int r = i + di, c = j + dj;
            if (di == 0 && dj == 0)
                continue;                          /* the cell itself */
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS)
                continue;                          /* outside the grid */
            count += grid[r][c];
        }
    return count;
}

/* next_generation: read the current grid, write into next, copy back */
void next_generation(int grid[ROWS][COLS])
{
    int next[ROWS][COLS];
    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++) {
            int n = count_neighbors(grid, i, j);
            if (grid[i][j])
                next[i][j] = (n == 2 || n == 3);   /* survives */
            else
                next[i][j] = (n == 3);             /* is born */
        }
    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++)
            grid[i][j] = next[i][j];
}

/* next_generation_in_place: WRONG - later cells see cells already changed */
void next_generation_in_place(int grid[ROWS][COLS])
{
    for (int i = 0; i < ROWS; i++)
        for (int j = 0; j < COLS; j++) {
            int n = count_neighbors(grid, i, j);
            if (grid[i][j])
                grid[i][j] = (n == 2 || n == 3);
            else
                grid[i][j] = (n == 3);
        }
}

int main(int argc, char *argv[])
{
    int grid[ROWS][COLS] = {0};
    char screen[ROWS][GENS * (COLS + 2)];
    int in_place = argc > 1 && strcmp(argv[1], "inplace") == 0;
    int skip = argc > 2 ? atoi(argv[2]) : 0;      /* generations to run before drawing */

    if (argc > 1 && strcmp(argv[1], "blinker") == 0) {
        grid[4][3] = grid[4][4] = grid[4][5] = 1;
    } else {                                       /* glider */
        grid[0][1] = 1;
        grid[1][2] = 1;
        grid[2][0] = grid[2][1] = grid[2][2] = 1;
    }

    for (int g = 0; g < skip; g++)
        next_generation(grid);
    for (int g = 0; g < GENS; g++) {               /* draw generation g */
        for (int i = 0; i < ROWS; i++)
            for (int j = 0; j < COLS + 2; j++)
                screen[i][g * (COLS + 2) + j] = j < COLS ? (grid[i][j] ? '#' : '.') : ' ';
        if (in_place)
            next_generation_in_place(grid);
        else
            next_generation(grid);
    }
    for (int g = 0; g < GENS; g++)
        printf("gen %-6d", skip + g);           /* COLS + 2 columns */
    printf("\n");
    for (int i = 0; i < ROWS; i++) {
        for (int k = 0; k < GENS * (COLS + 2) - 2; k++)
            putchar(screen[i][k]);
        putchar('\n');
    }
    return 0;
}
