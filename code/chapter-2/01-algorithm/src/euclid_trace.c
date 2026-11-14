/* euclid_trace.c - Euclid's algorithm (Knuth, TAOCP vol. 1, 1.1, Algorithm E)
 * printed as a trace table: one row per iteration, the values of m, n, r.
 *   E1. [Find remainder.] r <- m mod n.
 *   E2. [Is it zero?]     if r = 0, the answer is n.
 *   E3. [Reduce.]         m <- n, n <- r, go back to E1.
 * Usage: euclid_trace m n
 */
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    if (argc < 3) {
        fprintf(stderr, "usage: euclid_trace m n\n");
        return 1;
    }
    long m = atol(argv[1]), n = atol(argv[2]);
    printf("step      m      n      r\n");
    for (int step = 1; ; step++) {
        long r = m % n;                       /* E1 */
        printf("%4d %6ld %6ld %6ld\n", step, m, n, r);
        if (r == 0) {                         /* E2 */
            printf("gcd = %ld\n", n);
            return 0;
        }
        m = n;                                /* E3 */
        n = r;
    }
}
