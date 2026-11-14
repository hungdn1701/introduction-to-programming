/* sieve.c - Sieve of Eratosthenes (Sedgewick, Algorithms in C, 3.2): lists
 * the primes up to 100, then counts the work for n = 100000 against trial
 * division. */
#include <stdbool.h>
#include <stdio.h>

#define MAX 100000

/* sieve: is_prime[i] becomes true exactly for the primes 2 <= i <= n;
 * returns the number of crossings */
long sieve(bool is_prime[], int n)
{
    long crossings = 0;
    for (int i = 2; i <= n; i++)
        is_prime[i] = true;
    for (int i = 2; i * i <= n; i++)
        if (is_prime[i])
            for (int j = i * i; j <= n; j += i) {
                is_prime[j] = false;
                crossings++;
            }
    return crossings;
}

/* trial_divisions: divisions used to test 2..n one by one, as in prime.c */
long trial_divisions(int n)
{
    long divisions = 0;
    for (int m = 2; m <= n; m++)
        for (int d = 2; d * d <= m; d++) {
            divisions++;
            if (m % d == 0)
                break;
        }
    return divisions;
}

int main(void)
{
    static bool is_prime[MAX + 1];
    int count = 0;

    sieve(is_prime, 100);
    printf("primes up to 100:");
    for (int i = 2; i <= 100; i++)
        if (is_prime[i]) {
            printf(" %d", i);
            count++;
        }
    printf("\n(%d primes)\n", count);

    long crossings = sieve(is_prime, MAX);
    count = 0;
    for (int i = 2; i <= MAX; i++)
        if (is_prime[i])
            count++;
    printf("n = %d: %d primes\n", MAX, count);
    printf("sieve          : %ld crossings\n", crossings);
    printf("trial division : %ld divisions\n", trial_divisions(MAX));
    return 0;
}
