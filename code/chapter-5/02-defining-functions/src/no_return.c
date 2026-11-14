#include <stdbool.h>
#include <stdio.h>

bool is_even(int n)
{
    if (n % 2 == 0)
        return true;
}

int main(void)
{
    printf("%d\n", is_even(4));
    return 0;
}
