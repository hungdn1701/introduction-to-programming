/* stars.c - why global variables are risky: main and print_stars share one global i, so the call
 * leaves i at 4 and main's loop ends after one row; with a local i in each loop, the two names are
 * two different variables (different scopes) and main prints three rows. No warning in either case. */
#include <stdio.h>

int i;                          /* global: every function sees and changes it */

void print_stars_global(int n)
{
    for (i = 0; i < n; i++)
        printf("*");
    printf("\n");
}

void print_stars_local(int n)
{
    for (int i = 0; i < n; i++)  /* local i: only this loop sees it */
        printf("*");
    printf("\n");
}

int main(void)
{
    printf("global i:\n");
    for (i = 1; i <= 3; i++)
        print_stars_global(4);

    printf("local i:\n");
    for (int k = 1; k <= 3; k++)
        print_stars_local(4);
    return 0;
}
