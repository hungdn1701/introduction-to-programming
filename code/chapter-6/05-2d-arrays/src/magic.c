/* magic.c - check a magic square: every row, every column and both diagonals have the same sum.
 * Dürer's square from the engraving Melencolia I (1514; the date stands in the bottom row, 15 14).
 * Swapping two cells of a row keeps the row sums but breaks two column sums. */
#include <stdbool.h>
#include <stdio.h>

#define N 4

bool is_magic(int m[N][N])
{
    int target = 0, d1 = 0, d2 = 0;
    bool ok = true;
    for (int j = 0; j < N; j++)
        target += m[0][j];

    printf("rows     :");
    for (int i = 0; i < N; i++) {
        int s = 0;
        for (int j = 0; j < N; j++)
            s += m[i][j];
        printf(" %d", s);
        ok = ok && s == target;
    }
    printf("\ncolumns  :");
    for (int j = 0; j < N; j++) {
        int s = 0;
        for (int i = 0; i < N; i++)
            s += m[i][j];
        printf(" %d", s);
        ok = ok && s == target;
    }
    for (int i = 0; i < N; i++) {
        d1 += m[i][i];             /* main diagonal */
        d2 += m[i][N - 1 - i];     /* anti-diagonal */
    }
    printf("\ndiagonals: %d %d\n", d1, d2);
    return ok && d1 == target && d2 == target;
}

int main(void)
{
    int durer[N][N] = {{16,  3,  2, 13},
                       { 5, 10, 11,  8},
                       { 9,  6,  7, 12},
                       { 4, 15, 14,  1}};
    printf("magic square: %s\n", is_magic(durer) ? "yes" : "no");

    int t = durer[0][1];           /* swap 3 and 2 in the first row */
    durer[0][1] = durer[0][2];
    durer[0][2] = t;
    printf("after swapping 3 and 2:\n");
    printf("magic square: %s\n", is_magic(durer) ? "yes" : "no");
    return 0;
}
