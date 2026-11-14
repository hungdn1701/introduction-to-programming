/* collatz.c - the 3n + 1 problem (Collatz, 1937; Hayes, Computer Recreations, Scientific American,
 * January 1984): halve n when it is even, replace it by 3n + 1 when it is odd, until n is 1.
 * Nobody knows in advance how many iterations the while loop needs, and nobody has proved that it
 * stops for every n, although computers have checked very large ranges of n. */
#include <stdio.h>

int main(void)
{
    int n;
    if (scanf("%d", &n) != 1 || n < 1)
        return 1;

    int start = n, steps = 0, peak = n;
    while (n != 1) {
        if (n % 2 == 0)
            n = n / 2;
        else
            n = 3 * n + 1;
        steps++;
        if (n > peak)
            peak = n;
    }
    printf("%d: %d steps, peak %d\n", start, steps, peak);
    return 0;
}
