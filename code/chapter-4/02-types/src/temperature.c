/* temperature.c - one Fahrenheit temperature in Celsius, two ways
 * (K&R 1.2: with integers 5/9 is truncated to zero). */
#include <stdio.h>

int main(void)
{
    int fahr = 100;

    int celsius_int = 5 / 9 * (fahr - 32);          /* integer division: 5/9 is 0 */
    double celsius = 5.0 / 9.0 * (fahr - 32);       /* floating point */

    printf("5 / 9         = %d\n", 5 / 9);
    printf("integer   : %d F = %d C\n", fahr, celsius_int);
    printf("floating  : %d F = %f C\n", fahr, celsius);
    return 0;
}
