/* doubling.c - the doubling experiment of Sedgewick & Wayne, Algorithms (4th ed.), §1.4:
 * run TwoSum (count the pairs a[i] + a[j] == 0 by checking every pair, an O(n^2) algorithm)
 * for n, 2n, 4n, 8n and measure the running time. The seconds depend on the machine; the ratio
 * between two consecutive rows tends to 2^2 = 4. Each n is timed five times and the shortest time is
 * kept, which removes most of the noise from other programs running on the machine.
 * The numbers are pseudo-random in [-1 000 000, 1 000 000] from a fixed seed (2026), so every run
 * uses the same data.
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_N 80000
#define RUNS 5

static int a[MAX_N];

static long long two_sum(int n)
{
    long long count = 0;
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            if (a[i] + a[j] == 0)
                count++;
    return count;
}

int main(void)
{
    srand(2026);
    for (int i = 0; i < MAX_N; i++)
        a[i] = (int)((long long)rand() * rand() % 2000001) - 1000000;

    printf("%8s %8s %10s %8s\n", "n", "pairs", "time (s)", "ratio");
    double previous = 0;
    for (int n = 10000; n <= MAX_N; n *= 2) {
        long long pairs = 0;
        double seconds = 0;
        for (int run = 0; run < RUNS; run++) {
            clock_t start = clock();
            pairs = two_sum(n);
            double t = (double)(clock() - start) / CLOCKS_PER_SEC;
            if (run == 0 || t < seconds)
                seconds = t;
        }
        if (previous > 0)
            printf("%8d %8lld %10.3f %8.1f\n", n, pairs, seconds, seconds / previous);
        else
            printf("%8d %8lld %10.3f %8s\n", n, pairs, seconds, "-");
        previous = seconds;
    }
    return 0;
}
