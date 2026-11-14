/* hypotenuse.c - call sqrt from math.h: the function takes an argument and
 * returns a value; how it computes the root is hidden inside the library. */
#include <stdio.h>
#include <math.h>

int main(void)
{
    double a = 3.0, b = 4.0;
    double c = sqrt(a * a + b * b);
    printf("sides %.1f and %.1f: hypotenuse %.3f\n", a, b, c);
    printf("pow(2, 10) = %.0f\n", pow(2, 10));
    return 0;
}
