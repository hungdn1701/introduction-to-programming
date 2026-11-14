/* fraction_strict.c - read one fraction with the format "%d/%d": the / must follow the first number at once.
 * King, C Programming: A Modern Approach, §3.2: a white-space character in a format string matches
 * any amount of white space in the input, including none; an ordinary character such as / must match
 * exactly; %d itself skips white space before the number. */
#include <stdio.h>

int main(void)
{
    int num, denom;
    int n = scanf("%d/%d", &num, &denom);
    if (n == 2)
        printf("scanf returned %d: %d/%d\n", n, num, denom);
    else
        printf("scanf returned %d\n", n);
    return 0;
}
