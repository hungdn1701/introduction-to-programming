/* pyramid.c - a centred pyramid of height n: row i has n - i spaces and
 * 2i - 1 stars (Deitel diamond exercise; CS50 "Mario" variant). */
#include <stdio.h>

int main(void)
{
    int n;
    if (scanf("%d", &n) != 1 || n < 1)
        return 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++)     /* leading spaces */
            printf(" ");
        for (int j = 1; j <= 2 * i - 1; j++) /* stars */
            printf("*");
        printf("\n");
    }
    return 0;
}
