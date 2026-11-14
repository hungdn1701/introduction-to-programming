/* divide_last.c - the order of integer operations in K&R 1.2: "multiplying by 5 and then dividing by 9
 * instead of just multiplying by 5/9" keeps the result, because integer division truncates (toward
 * zero since C99), so only the fraction of the final result is lost. */
#include <stdio.h>

int main(void)
{
    printf("%4s %12s %12s %16s\n", "fahr", "5/9*(f-32)", "5*(f-32)/9", "5.0/9.0*(f-32)");

    int fahr = 100;
    int c1 = 5 / 9 * (fahr - 32);          /* 5 / 9 is 0 first */
    int c2 = 5 * (fahr - 32) / 9;          /* K&R 1.2: divide last */
    double c3 = 5.0 / 9.0 * (fahr - 32);
    printf("%4d %12d %12d %16f\n", fahr, c1, c2, c3);

    fahr = 0;
    c1 = 5 / 9 * (fahr - 32);
    c2 = 5 * (fahr - 32) / 9;
    c3 = 5.0 / 9.0 * (fahr - 32);
    printf("%4d %12d %12d %16f\n", fahr, c1, c2, c3);
    return 0;
}
