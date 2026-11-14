/* triangle_star.c - a right triangle of stars, row i has i stars
 * (Deitel & Deitel, C How to Program, loop exercises). */
#include <stdio.h>

int main(void)
{
    int n = 5;
    for (int i = 1; i <= n; i++) {          /* outer loop: one row */
        for (int j = 1; j <= i; j++)        /* inner loop: i stars */
            printf("*");
        printf("\n");
    }
    return 0;
}
