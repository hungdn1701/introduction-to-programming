/* overflow.c - 50000 * 50000 does not fit in an int (CS:APP, chapter 2).
 * Signed overflow is undefined behaviour in C: the value printed is what
 * this machine happens to produce, not a guaranteed result. */
#include <stdio.h>

int main(void)
{
    int x = 50000 * 50000;
    long long y = 50000LL * 50000;
    printf("int       : %d\n", x);
    printf("long long : %lld\n", y);
    return 0;
}
