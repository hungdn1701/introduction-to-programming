/* pyramid_trailing.c - same pyramid, but pads every row with spaces to the
 * full width: looks identical on screen, differs byte by byte. */
#include <stdio.h>

int main(void)
{
    int n;
    if (scanf("%d", &n) != 1 || n < 1)
        return 1;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n - i; j++)
            printf(" ");
        for (int j = 1; j <= 2 * i - 1; j++)
            printf("*");
        for (int j = 1; j <= n - i; j++)     /* trailing spaces */
            printf(" ");
        printf("\n");
    }
    return 0;
}
