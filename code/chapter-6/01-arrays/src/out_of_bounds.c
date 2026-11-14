/* out_of_bounds.c - C does not check indexes: the loop writes a[10],
 * one element past the end, and changes the variable stored there. */
#include <stdio.h>

#define N 10

int main(void)
{
    int before = 111;
    int a[N];
    int after = 222;

    printf("&a[0] = %p, &a[9] = %p\n", (void *) &a[0], (void *) &a[9]);
    printf("&before = %p, &after = %p\n", (void *) &before, (void *) &after);
    for (int i = 0; i <= N; i++)       /* i <= N: one step too far */
        a[i] = 0;
    printf("before = %d, after = %d\n", before, after);
    return 0;
}
