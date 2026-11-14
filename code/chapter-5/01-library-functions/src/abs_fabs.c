/* abs_fabs.c - read the declaration before calling a library function: stdlib.h declares
 * int abs(int j), math.h declares double fabs(double x) (C17 7.22.6.1, 7.12.7.2). Passing a double to
 * abs converts it to int first, so the fraction is lost; GCC -Wextra warns (-Wabsolute-value). */
#include <math.h>
#include <stdio.h>
#include <stdlib.h>

int main(void)
{
    double x = -2.7;
    printf("abs(x)  = %d\n", abs(x));      /* int abs(int): x becomes -2 */
    printf("fabs(x) = %.1f\n", fabs(x));   /* double fabs(double) */
    return 0;
}
