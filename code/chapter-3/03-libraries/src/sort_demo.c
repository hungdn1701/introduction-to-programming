/* sort_demo.c - sort with qsort from the C standard library (stdlib.h)
 * instead of writing a sorting algorithm by hand (K&R, Appendix B5;
 * Kernighan & Pike, The Practice of Programming, 2.3). */
#include <stdio.h>
#include <stdlib.h>

static int compare_ints(const void *p, const void *q)
{
    int a = *(const int *)p, b = *(const int *)q;
    return (a > b) - (a < b);
}

int main(void)
{
    int a[] = {42, 7, 19, 3, 88, 25, 61, 14, 50, 36};
    size_t n = sizeof a / sizeof a[0];

    qsort(a, n, sizeof a[0], compare_ints);

    for (size_t i = 0; i < n; i++)
        printf("%d ", a[i]);
    printf("\n");
    return 0;
}
