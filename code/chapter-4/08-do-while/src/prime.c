/* prime.c - trial division; break leaves the loop at the first divisor
 * (King 6.4). */
#include <stdio.h>

int main(void)
{
    int n, d, tries = 0;

    if (scanf("%d", &n) != 1 || n < 2)
        return 1;
    for (d = 2; d < n; d++) {
        tries++;
        if (n % d == 0)
            break;
    }
    if (d < n)
        printf("%d is divisible by %d (%d tries)\n", n, d, tries);
    else
        printf("%d is prime (%d tries)\n", n, tries);
    return 0;
}
