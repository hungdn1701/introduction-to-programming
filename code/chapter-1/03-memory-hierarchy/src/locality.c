/* locality.c - the same sum, two traversal orders (CS:APP, section 6.2:
 * sumarrayrows and sumarraycols). C stores a 2-D array row by row, so
 * walking along a row touches neighbouring memory; walking down a column
 * jumps N * sizeof(int) bytes each step and misses the cache.
 */
#include <stdio.h>
#include <time.h>

#define N 4096

static int a[N][N];               /* 4096 * 4096 * 4 bytes = 64 MB */

static long long sum_rows(void)
{
    long long sum = 0;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            sum += a[i][j];       /* next element is the next int in memory */
    return sum;
}

static long long sum_cols(void)
{
    long long sum = 0;
    for (int j = 0; j < N; j++)
        for (int i = 0; i < N; i++)
            sum += a[i][j];       /* next element is 16 KB further away */
    return sum;
}

static double ms_since(clock_t start)
{
    return 1000.0 * (double)(clock() - start) / CLOCKS_PER_SEC;
}

int main(void)
{
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            a[i][j] = 1;

    clock_t t = clock();
    long long r = sum_rows();
    double t_rows = ms_since(t);

    t = clock();
    long long c = sum_cols();
    double t_cols = ms_since(t);

    printf("array: %d x %d ints (%d MB)\n", N, N, (int)(sizeof a / (1024 * 1024)));
    printf("row by row      : sum = %lld, %7.1f ms\n", r, t_rows);
    printf("column by column: sum = %lld, %7.1f ms\n", c, t_cols);
    printf("column / row    : %.1f times slower\n", t_cols / t_rows);
    return 0;
}
