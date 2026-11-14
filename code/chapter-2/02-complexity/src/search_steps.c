/* search_steps.c - count the comparisons of two ways to search a sorted list
 * (the phone book of Bentley, Programming Pearls, column 4):
 *   linear search: look at entries one by one;
 *   binary search: open the middle, throw away the half that cannot hold it.
 * The list is implicit (entry i holds the value 2*i), so very large n needs
 * no memory. The key searched for is the last entry: the worst case.
 */
#include <stdio.h>

static long long entry(long long i) { return 2 * i; }

static long long linear(long long n, long long key)
{
    long long count = 0;
    for (long long i = 0; i < n; i++) {
        count++;
        if (entry(i) == key)
            break;
    }
    return count;
}

static long long binary(long long n, long long key)
{
    long long low = 0, high = n - 1, count = 0;
    while (low <= high) {
        long long mid = low + (high - low) / 2;
        count++;
        if (key < entry(mid))
            high = mid - 1;
        else if (key > entry(mid))
            low = mid + 1;
        else
            break;
    }
    return count;
}

int main(void)
{
    long long sizes[] = {1000, 1000000, 1000000000};
    printf("%13s %15s %15s\n", "n", "linear search", "binary search");
    for (int k = 0; k < 3; k++) {
        long long n = sizes[k], key = entry(n - 1);
        printf("%13lld %15lld %15lld\n", n, linear(n, key), binary(n, key));
    }
    return 0;
}
