/* sizes.c - how many bytes each basic type takes, and the range of int.
 * sizeof gives a size_t; storing it in an int and printing with %d avoids a
 * false -Wformat warning that MinGW GCC gives for %zu on Windows. */
#include <stdio.h>
#include <limits.h>

int main(void)
{
    int size_char = sizeof(char);
    int size_int = sizeof(int);
    int size_double = sizeof(double);

    printf("sizeof(char)   = %d byte\n", size_char);
    printf("sizeof(int)    = %d bytes\n", size_int);
    printf("sizeof(double) = %d bytes\n", size_double);
    printf("INT_MIN = %d\n", INT_MIN);
    printf("INT_MAX = %d\n", INT_MAX);
    return 0;
}
