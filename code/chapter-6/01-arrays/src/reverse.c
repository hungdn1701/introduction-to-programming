/* reverse.c - reads ten numbers and prints them in reverse order
 * (King, C Programming: A Modern Approach, 8.1). */
#include <stdio.h>

#define N 10

int main(void)
{
    int a[N];

    for (int i = 0; i < N; i++)
        if (scanf("%d", &a[i]) != 1)
            return 1;

    printf("In reverse order:");
    for (int i = N - 1; i >= 0; i--)
        printf(" %d", a[i]);
    printf("\n");
    return 0;
}
