/* swap.c - K&R 5.2: pass the addresses of a and b, so swap can change them */
#include <stdio.h>

void swap(int *px, int *py)    /* interchange *px and *py */
{
    int temp = *px;
    *px = *py;
    *py = temp;
}

int main(void)
{
    int a = 1, b = 2;
    printf("before swap: a = %d, b = %d\n", a, b);
    swap(&a, &b);
    printf("after swap : a = %d, b = %d\n", a, b);
    return 0;
}
