#include <stdio.h>

void show_size(int a[])
{
    printf("in function: sizeof(a) = %d\n", (int) sizeof(a));
}

int main(void)
{
    int a[5] = {7, 9, 4, 10, 6};
    printf("in main    : sizeof(a) = %d\n", (int) sizeof(a));
    show_size(a);
    return 0;
}
