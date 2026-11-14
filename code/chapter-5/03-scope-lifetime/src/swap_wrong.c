/* swap_wrong.c - K&R 5.2: swap(int x, int y) is WRONG; the function gets
 * copies of a and b (call by value, K&R 1.8). */
#include <stdio.h>

void swap(int x, int y)
{
    int temp = x;
    x = y;
    y = temp;
    printf("inside swap : x = %d, y = %d\n", x, y);
}

int main(void)
{
    int a = 1, b = 2;
    printf("before swap : a = %d, b = %d\n", a, b);
    swap(a, b);
    printf("after swap  : a = %d, b = %d\n", a, b);
    return 0;
}
