/* prime.c - after King, C Programming: A Modern Approach, 9.1: is_prime is a
 * checking function (returns bool); print_line is a void function. */
#include <stdbool.h>
#include <stdio.h>

bool is_prime(int n);
void print_line(int width);

int main(void)
{
    int n;
    if (scanf("%d", &n) != 1)
        return 1;
    print_line(20);
    if (is_prime(n))
        printf("%d is prime\n", n);
    else
        printf("%d is not prime\n", n);
    print_line(20);
    return 0;
}

bool is_prime(int n)
{
    if (n <= 1)
        return false;
    for (int divisor = 2; divisor * divisor <= n; divisor++)
        if (n % divisor == 0)
            return false;
    return true;
}

void print_line(int width)
{
    for (int i = 0; i < width; i++)
        printf("-");
    printf("\n");
}
