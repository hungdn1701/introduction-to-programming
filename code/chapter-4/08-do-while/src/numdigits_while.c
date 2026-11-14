/* numdigits_while.c - the same count with while: wrong for n = 0 */
#include <stdio.h>

int main(void)
{
    int digits = 0, n;

    if (scanf("%d", &n) != 1)
        return 1;
    while (n > 0) {
        n /= 10;
        digits++;
    }
    printf("The number has %d digit(s).\n", digits);
    return 0;
}
