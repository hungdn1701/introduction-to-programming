/* goldbach.c - reuse is_prime of prime.c for a new task: Goldbach's conjecture (letter to Euler, 1742)
 * says that every even number greater than 2 is the sum of two primes. With is_prime written once,
 * listing the decompositions of n takes one loop and one condition that reads like the sentence. */
#include <stdbool.h>
#include <stdio.h>

bool is_prime(int n);

int main(void)
{
    int n;
    if (scanf("%d", &n) != 1 || n <= 2 || n % 2 != 0)
        return 1;
    for (int p = 2; p <= n / 2; p++)
        if (is_prime(p) && is_prime(n - p))
            printf("%d = %d + %d\n", n, p, n - p);
    return 0;
}

bool is_prime(int n)
{
    if (n <= 1)
        return false;
    for (int divisor = 2; divisor * divisor <= n; divisor++)
        if (n % divisor == 0)
            return false;
    return true;
}
