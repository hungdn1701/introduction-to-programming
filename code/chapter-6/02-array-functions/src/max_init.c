/* max_init.c - why find_max starts from a[0]: the same function with max initialised to 0 returns 0
 * for an array of negative numbers, a value that is not in the array. */
#include <stdio.h>

int find_max(const int a[], int n)
{
    int max = a[0];
    for (int i = 1; i < n; i++)
        if (a[i] > max)
            max = a[i];
    return max;
}

int find_max_zero(const int a[], int n)
{
    int max = 0;                   /* wrong: assumes some element is >= 0 */
    for (int i = 0; i < n; i++)
        if (a[i] > max)
            max = a[i];
    return max;
}

int main(void)
{
    int night[] = {-3, -7, -1, -12};   /* night temperatures in winter */
    int n = sizeof(night) / sizeof(night[0]);

    printf("night:");
    for (int i = 0; i < n; i++)
        printf(" %d", night[i]);
    printf("\n");
    printf("find_max      (max = a[0]): %d\n", find_max(night, n));
    printf("find_max_zero (max = 0)   : %d\n", find_max_zero(night, n));
    return 0;
}
