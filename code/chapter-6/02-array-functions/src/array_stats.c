/* array_stats.c - functions that take an array argument: largest element,
 * average, linear search, clear (King, C Programming: A Modern Approach,
 * ch. 9, array arguments). The array is not copied: the function works on
 * the caller's elements. */
#include <stdio.h>

int find_max(const int a[], int n)
{
    int max = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] > max)
            max = a[i];
    return max;
}

double average(const int a[], int n)
{
    int sum = 0;
    for (int i = 0; i < n; i++)
        sum += a[i];
    return (double) sum / n;
}

/* linear_search: index of the first element equal to key, or -1 */
int linear_search(const int a[], int n, int key)
{
    for (int i = 0; i < n; i++)
        if (a[i] == key)
            return i;
    return -1;
}

void clear(int a[], int n)
{
    for (int i = 0; i < n; i++)
        a[i] = 0;
}

void print_array(const int a[], int n)
{
    for (int i = 0; i < n; i++)
        printf(" %d", a[i]);
    printf("\n");
}

int main(void)
{
    int scores[] = {7, 9, 4, 10, 6};
    int n = sizeof(scores) / sizeof(scores[0]);

    printf("scores:");
    print_array(scores, n);
    printf("max = %d, average = %.2f\n", find_max(scores, n), average(scores, n));
    printf("search 4: %d, search 8: %d\n", linear_search(scores, n, 4), linear_search(scores, n, 8));
    clear(scores, n);
    printf("after clear(scores, n):");
    print_array(scores, n);
    return 0;
}
