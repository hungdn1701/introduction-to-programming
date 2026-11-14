/* row_major.c - the elements of int a[3][3] are stored row by row:
 * a[0][2] is followed by a[1][0]. */
#include <stdio.h>

int main(void)
{
    int a[3][3];

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            printf("&a[%d][%d] = %p\n", i, j, (void *) &a[i][j]);
    printf("sizeof(int) = %d\n", (int) sizeof(int));
    return 0;
}
