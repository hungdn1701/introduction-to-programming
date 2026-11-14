/* sort_time.c - time insertion sort on growing n and qsort on n = 1000000
 * (random ints, fixed seed). Times depend on the machine. */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define BIG 1000000

void insertion_sort(int a[], int n)
{
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}

int compare_ints(const void *p, const void *q)
{
    int x = *(const int *) p, y = *(const int *) q;
    return (x > y) - (x < y);
}

int main(void)
{
    static int a[BIG];
    int sizes[] = {10000, 20000, 40000, 80000};

    srand(2026);
    for (int k = 0; k < 4; k++) {
        int n = sizes[k];
        for (int i = 0; i < n; i++)
            a[i] = rand();
        clock_t start = clock();
        insertion_sort(a, n);
        printf("insertion sort, n = %7d: %6.0f ms\n", n, 1000.0 * (clock() - start) / CLOCKS_PER_SEC);
    }
    for (int i = 0; i < BIG; i++)
        a[i] = rand();
    clock_t start = clock();
    qsort(a, BIG, sizeof(a[0]), compare_ints);
    printf("qsort,          n = %7d: %6.0f ms\n", BIG, 1000.0 * (clock() - start) / CLOCKS_PER_SEC);
    return 0;
}
