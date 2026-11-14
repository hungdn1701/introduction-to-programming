/* pythagoras.c - Pythagorean triples by brute force with three nested loops (Deitel, C How to Program,
 * exercise "Pythagorean Triples"): try every a <= b <= c <= N and keep a*a + b*b == c*c.
 * The inner bounds start at the outer variable, so each triple is tried once; the program also
 * counts how many times the innermost body runs. */
#include <stdio.h>

#define N 20

int main(void)
{
    int tries = 0, found = 0;
    for (int a = 1; a <= N; a++)
        for (int b = a; b <= N; b++)
            for (int c = b; c <= N; c++) {
                tries++;
                if (a * a + b * b == c * c) {
                    printf("%2d %2d %2d\n", a, b, c);
                    found++;
                }
            }
    printf("%d triples, %d tries\n", found, tries);
    return 0;
}
