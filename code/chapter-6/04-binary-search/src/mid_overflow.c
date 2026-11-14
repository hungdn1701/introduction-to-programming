/* mid_overflow.c - (low + high) / 2 overflows int when low + high is larger
 * than INT_MAX (Bloch, 2006); low + (high - low) / 2 does not. Signed
 * overflow is undefined behavior; this build (-O0) shows the wrapped value. */
#include <limits.h>
#include <stdio.h>

int main(void)
{
    int low = 1500000000, high = 1600000000;

    printf("INT_MAX                = %d\n", INT_MAX);
    printf("(low + high) / 2       = %d\n", (low + high) / 2);
    printf("low + (high - low) / 2 = %d\n", low + (high - low) / 2);
    return 0;
}
