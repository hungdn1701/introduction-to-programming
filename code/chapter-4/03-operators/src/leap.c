/* leap.c - the leap year rule of the Gregorian calendar as one C
 * expression (K&R 2.5): divisible by 4 but not by 100, or divisible by 400. */
#include <stdio.h>

int main(void)
{
    int years[] = {1900, 2000, 2024, 2026, 2100};

    for (int i = 0; i < 5; i++) {
        int year = years[i];
        int leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
        printf("%d: leap = %d\n", year, leap);
    }
    return 0;
}
