/* binsearch.c - binary search after K&R 3.3, with mid computed as
 * low + (high - low) / 2 (Bloch, 2006). It counts probes, prints a trace
 * on request, runs nine test cases, and compares with linear search on
 * 1000000 elements. */
#include <stdio.h>

#define BIG 1000000

static long probes;

/* binsearch: find x in v[0] <= v[1] <= ... <= v[n-1]; return index or -1 */
int binsearch(int x, const int v[], int n, int trace)
{
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        probes++;
        if (trace)
            printf("  low = %2d, high = %2d, mid = %2d, v[mid] = %d\n", low, high, mid, v[mid]);
        if (x < v[mid])
            high = mid - 1;
        else if (x > v[mid])
            low = mid + 1;
        else
            return mid;          /* found match */
    }
    return -1;                   /* no match */
}

int linear_search(int x, const int v[], int n)
{
    for (int i = 0; i < n; i++) {
        probes++;
        if (v[i] == x)
            return i;
    }
    return -1;
}

int main(void)
{
    int v[] = {1, 4, 6, 9, 12, 15, 17, 19, 21, 23, 30, 42, 56, 77, 99};
    int n = sizeof(v) / sizeof(v[0]);

    printf("search 23:\n");
    printf("  index %d\n", binsearch(23, v, n, 1));

    /* test cases: value, expected index */
    int x[] = {23, 1, 99, 24, 0, 100, 19, 30, 56};
    int expected[] = {9, 0, 14, -1, -1, -1, 7, 10, 12};
    int passed = 0;
    for (int k = 0; k < 9; k++) {
        probes = 0;
        int got = binsearch(x[k], v, n, 0);
        printf("case %d: x = %3d, expected %2d, got %2d, %ld probes  %s\n",
               k + 1, x[k], expected[k], got, probes, got == expected[k] ? "OK" : "FAIL");
        passed += got == expected[k];
    }
    printf("%d/9 cases passed\n", passed);

    static int big[BIG];
    for (int i = 0; i < BIG; i++)
        big[i] = 2 * i;                  /* sorted even numbers */
    probes = 0;
    binsearch(-1, big, BIG, 0);
    printf("n = %d, x not present: binary search %ld probes, ", BIG, probes);
    probes = 0;
    linear_search(-1, big, BIG);
    printf("linear search %ld probes\n", probes);
    return 0;
}
