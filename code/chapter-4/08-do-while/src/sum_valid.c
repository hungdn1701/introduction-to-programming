/* sum_valid.c - continue in the style of K&R §3.7: read scores until the end of input; a negative
 * entry marks a missing score and is skipped, so the main work is not nested in another if. */
#include <stdio.h>

int main(void)
{
    int x, sum = 0, count = 0;
    while (scanf("%d", &x) == 1) {
        if (x < 0)
            continue;              /* skip invalid entries */
        sum += x;
        count++;
    }
    printf("%d valid entries, sum %d\n", count, sum);
    return 0;
}
