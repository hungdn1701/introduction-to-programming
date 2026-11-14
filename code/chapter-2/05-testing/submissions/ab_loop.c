#include <stdio.h>

int main(void)
{
    long long a, b;
    scanf("%lld %lld", &a, &b);
    while (a != b)        /* meant to stop when ... but never does */
        a = a + 0;
    printf("%lld\n", a + b);
    return 0;
}
