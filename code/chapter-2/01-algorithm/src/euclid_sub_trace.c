/* euclid_sub_trace.c - Euclid's algorithm in its original form (Elements, Book VII, Prop. 2;
 * Knuth, TAOCP vol. 2, 4.5.2): subtract the smaller number from the larger until both are equal.
 * Printed as a trace table, one row per iteration, to compare with euclid_trace.c.
 * Usage: euclid_sub_trace m n
 */
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    if (argc < 3) {
        fprintf(stderr, "usage: euclid_sub_trace m n\n");
        return 1;
    }
    long m = atol(argv[1]), n = atol(argv[2]);
    printf("step      m      n\n");
    for (int step = 1; m != n; step++) {
        if (m > n)
            m = m - n;
        else
            n = n - m;
        printf("%4d %6ld %6ld\n", step, m, n);
    }
    printf("gcd = %ld\n", m);
    return 0;
}
