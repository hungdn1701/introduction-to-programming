/* matrix_sum.c - row sums and column sums of a 4 x 3 table of scores
 * (4 students, 3 subjects). */
#include <stdio.h>

#define ROWS 4
#define COLS 3

int main(void)
{
    int score[ROWS][COLS] = {
        {7, 8, 9},
        {6, 5, 8},
        {9, 9, 10},
        {4, 7, 6}
    };
    int col_sum[COLS] = {0};

    printf("          sub1 sub2 sub3  row sum\n");
    for (int i = 0; i < ROWS; i++) {
        int row_sum = 0;
        printf("student %d", i + 1);
        for (int j = 0; j < COLS; j++) {
            printf("%5d", score[i][j]);
            row_sum += score[i][j];
            col_sum[j] += score[i][j];
        }
        printf("%9d\n", row_sum);
    }
    printf("col sum  ");
    for (int j = 0; j < COLS; j++)
        printf("%5d", col_sum[j]);
    printf("\n");
    return 0;
}
