/* sorts.c - insertion sort (Cormen et al., Introduction to Algorithms, 2.1)
 * and selection sort (Sedgewick, Algorithms in C, ch. 6) on 5 2 4 6 1 3,
 * printing the array after each pass. */
#include <stdio.h>

void print_pass(int pass, const int a[], int n)
{
    printf("  pass %d:", pass);
    for (int i = 0; i < n; i++)
        printf(" %d", a[i]);
    printf("\n");
}

void insertion_sort(int a[], int n)
{
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > key) {   /* shift larger elements right */
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;                  /* insert key into the gap */
        print_pass(i, a, n);
    }
}

void selection_sort(int a[], int n)
{
    for (int i = 0; i < n - 1; i++) {
        int min = i;                     /* smallest of a[i..n-1] */
        for (int j = i + 1; j < n; j++)
            if (a[j] < a[min])
                min = j;
        int t = a[i];
        a[i] = a[min];
        a[min] = t;
        print_pass(i + 1, a, n);
    }
}

int main(void)
{
    int a[] = {5, 2, 4, 6, 1, 3};
    int b[] = {5, 2, 4, 6, 1, 3};
    int n = sizeof(a) / sizeof(a[0]);

    printf("insertion sort:\n");
    insertion_sort(a, n);
    printf("selection sort:\n");
    selection_sort(b, n);
    return 0;
}
