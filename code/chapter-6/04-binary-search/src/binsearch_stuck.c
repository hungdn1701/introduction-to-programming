/* binsearch_stuck.c - binsearch.c with one line changed: low = mid instead of low = mid + 1.
 * The invariant still holds (x, if present, is in v[low..high]), but the segment does not always
 * shrink: when high = low + 1 and x > v[low], mid = low again and the loop makes no progress.
 * A round limit stops the loop so that the run can be shown. Same nine test cases as binsearch.c. */
#include <stdio.h>

#define LIMIT 100                /* a correct search of 15 elements needs at most 4 rounds */

int binsearch_stuck(int x, const int v[], int n, int *rounds)
{
    int low = 0, high = n - 1;
    *rounds = 0;
    while (low <= high && *rounds < LIMIT) {
        int mid = low + (high - low) / 2;
        ++*rounds;
        if (x < v[mid])
            high = mid - 1;
        else if (x > v[mid])
            low = mid;           /* wrong: should be mid + 1 */
        else
            return mid;
    }
    return -1;
}

int main(void)
{
    int v[] = {1, 4, 6, 9, 12, 15, 17, 19, 21, 23, 30, 42, 56, 77, 99};
    int n = sizeof(v) / sizeof(v[0]);
    int x[] = {23, 1, 99, 24, 0, 100, 19, 30, 56};
    int expected[] = {9, 0, 14, -1, -1, -1, 7, 10, 12};
    for (int k = 0; k < 9; k++) {
        int rounds;
        int got = binsearch_stuck(x[k], v, n, &rounds);
        if (rounds == LIMIT)
            printf("case %d: x = %3d, still looping after %d rounds  STUCK\n", k + 1, x[k], LIMIT);
        else
            printf("case %d: x = %3d, expected %2d, got %2d, %d rounds  %s\n", k + 1, x[k], expected[k], got,
                   rounds, got == expected[k] ? "OK" : "FAIL");
    }
    return 0;
}
