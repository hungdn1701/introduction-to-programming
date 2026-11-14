/* numdigits.c - count the digits of an integer with do-while
 * (King, C Programming: A Modern Approach, 6.2). */
#include <stdio.h>

int main(void)
{
    int digits = 0, n;

    if (scanf("%d", &n) != 1)
        return 1;
    do {
        n /= 10;
        digits++;
    } while (n > 0);
    printf("The number has %d digit(s).\n", digits);
    return 0;
}
