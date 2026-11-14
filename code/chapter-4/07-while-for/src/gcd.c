/* gcd.c - Euclid's algorithm (Knuth, TAOCP 1.1, Algorithm E) with while */
#include <stdio.h>

int main(void)
{
    int m, n;
    if (scanf("%d %d", &m, &n) != 2 || m <= 0 || n <= 0)
        return 1;

    while (m % n != 0) {
        int r = m % n;
        m = n;
        n = r;
    }
    printf("gcd = %d\n", n);
    return 0;
}
