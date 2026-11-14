/* min_max.c - one function, two results returned through pointers */
#include <stdio.h>

void min_max(int a, int b, int c, int *min, int *max)
{
    *min = a;
    *max = a;
    if (b < *min) *min = b;
    if (c < *min) *min = c;
    if (b > *max) *max = b;
    if (c > *max) *max = c;
}

int main(void)
{
    int lo, hi;
    min_max(7, 2, 9, &lo, &hi);
    printf("min = %d, max = %d\n", lo, hi);
    return 0;
}
