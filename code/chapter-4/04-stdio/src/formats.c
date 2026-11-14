/* formats.c - a few conversion specifications of printf (K&R 7.2) */
#include <stdio.h>

int main(void)
{
    int n = 42;
    double x = 2.0 / 3;
    char c = 'A';

    printf("[%d]\n", n);
    printf("[%5d]\n", n);
    printf("[%-5d]\n", n);
    printf("[%f]\n", x);
    printf("[%.2f]\n", x);
    printf("[%c] has code %d\n", c, c);
    return 0;
}
