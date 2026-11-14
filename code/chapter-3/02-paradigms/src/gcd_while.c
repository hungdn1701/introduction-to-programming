/* gcd_while.c - the same Euclid's algorithm as gcd_goto.c with the three structures of structured
 * programming only: sequence, selection (the loop condition) and iteration. */
#include <stdio.h>

int main(void)
{
    int m, n;
    if (scanf("%d %d", &m, &n) != 2)
        return 1;
    while (m % n != 0) {
        int r = m % n;
        m = n;
        n = r;
    }
    printf("gcd = %d\n", n);
    return 0;
}
