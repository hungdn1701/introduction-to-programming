/* digits.c - integer division and remainder split a number into digits;
 * compound assignment and increment change a variable. */
#include <stdio.h>

int main(void)
{
    int year = 2026;
    printf("2026 / 10 = %d\n", year / 10);
    printf("2026 %% 10 = %d\n", year % 10);
    printf("7 / 2 * 2 = %d\n", 7 / 2 * 2);

    int x = 10;
    x += 5;
    printf("after x += 5 : %d\n", x);
    x++;
    printf("after x++    : %d\n", x);
    return 0;
}
