/* sorted_uses.c - what a sorted array makes easy (Sedgewick & Wayne, Algorithms, 4th ed., §2.5,
 * sorting applications): equal elements stand next to each other, so one pass counts the distinct
 * values; the median is the middle element. */
#include <stdio.h>

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

int main(void)
{
    int scores[] = {7, 9, 4, 10, 6, 7, 9, 5, 7};
    int n = sizeof(scores) / sizeof(scores[0]);

    insertion_sort(scores, n);
    printf("sorted:");
    for (int i = 0; i < n; i++)
        printf(" %d", scores[i]);
    printf("\n");

    int distinct = 1;
    for (int i = 1; i < n; i++)
        if (scores[i] != scores[i - 1])   /* equal values are neighbours */
            distinct++;
    printf("distinct values: %d\n", distinct);
    printf("median: %d\n", scores[n / 2]);  /* n is odd: the middle element */
    return 0;
}
