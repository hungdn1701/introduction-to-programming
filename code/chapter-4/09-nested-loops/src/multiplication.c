/* multiplication.c - the 9 x 9 multiplication table, columns aligned with %4d */
#include <stdio.h>

int main(void)
{
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= 9; j++)
            printf("%4d", i * j);
        printf("\n");
    }
    return 0;
}
