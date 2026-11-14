/* repdigit.c - checks a number for repeated digits with a counting array
 * digit_seen[10] (King, C Programming: A Modern Approach, 8.1). */
#include <stdbool.h>
#include <stdio.h>

int main(void)
{
    bool digit_seen[10] = {false};
    long n, original;

    if (scanf("%ld", &n) != 1)
        return 1;
    original = n;
    while (n > 0) {
        int digit = n % 10;
        if (digit_seen[digit])
            break;
        digit_seen[digit] = true;
        n /= 10;
    }
    if (n > 0)
        printf("%ld: repeated digit\n", original);
    else
        printf("%ld: no repeated digit\n", original);
    return 0;
}
