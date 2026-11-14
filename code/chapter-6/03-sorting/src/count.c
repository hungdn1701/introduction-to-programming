/* count.c - counts comparisons of insertion sort and selection sort on
 * random arrays (fixed seed), and on an array that is already sorted. */
#include <stdio.h>
#include <stdlib.h>

#define MAXN 10000

long insertion_comparisons(int a[], int n)
{
    long c = 0;
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0) {
            c++;
            if (a[j] <= key)
                break;
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
    return c;
}

long selection_comparisons(int a[], int n)
{
    long c = 0;
    for (int i = 0; i < n - 1; i++) {
        int min = i;
        for (int j = i + 1; j < n; j++) {
            c++;
            if (a[j] < a[min])
                min = j;
        }
        int t = a[i];
        a[i] = a[min];
        a[min] = t;
    }
    return c;
}

int main(void)
{
    static int a[MAXN], b[MAXN];
    int sizes[] = {1000, 10000};

    srand(2026);
    printf("%8s %14s %14s\n", "n", "insertion", "selection");
    for (int k = 0; k < 2; k++) {
        int n = sizes[k];
        for (int i = 0; i < n; i++)
            a[i] = b[i] = rand();
        long ci = insertion_comparisons(a, n);
        long cs = selection_comparisons(b, n);
        printf("%8d %14ld %14ld\n", n, ci, cs);
    }
    for (int i = 0; i < 1000; i++)
        a[i] = b[i] = i;
    printf("sorted input, n = 1000: insertion %ld, selection %ld\n",
           insertion_comparisons(a, 1000), selection_comparisons(b, 1000));
    return 0;
}
