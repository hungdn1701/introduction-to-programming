/* gcd_goto.c - Euclid's algorithm (Chapter 2) written the way its flowchart is drawn: labels and goto
 * for every arrow. C still has goto (K&R 3.8), but structured programming (Böhm and Jacopini, 1966;
 * Dijkstra, 1968) replaces the backward arrow by a loop: see gcd_while.c, same result. */
#include <stdio.h>

int main(void)
{
    int m, n, r;
    if (scanf("%d %d", &m, &n) != 2)
        return 1;
loop:
    r = m % n;
    if (r == 0)
        goto done;
    m = n;
    n = r;
    goto loop;
done:
    printf("gcd = %d\n", n);
    return 0;
}
