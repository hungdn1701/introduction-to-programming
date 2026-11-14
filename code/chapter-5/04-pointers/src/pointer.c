/* pointer.c - a variable, its address, and a pointer to it (K&R 5.1) */
#include <stdio.h>

int main(void)
{
    int x = 5;
    int *px = &x;              /* px holds the address of x */

    printf("x = %d, address of x = %p\n", x, (void *) &x);
    printf("px = %p, *px = %d\n", (void *) px, *px);
    printf("address of px = %p\n", (void *) &px);
    *px = 7;                   /* write to x through px */
    printf("after *px = 7: x = %d\n", x);
    return 0;
}
