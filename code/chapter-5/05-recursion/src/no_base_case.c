#include <stdio.h>

long long factorial(int n)
{
    return n * factorial(n - 1);       /* no base case */
}

int main(void)
{
    printf("%lld\n", factorial(3));
    return 0;
}
