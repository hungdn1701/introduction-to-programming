/* array_assign.c - an array cannot be assigned with =, even to another array of the same type;
 * copy a string with strcpy (or wrap the array in a structure, as label.c does). */
#include <stdio.h>

int main(void)
{
    char s[16] = "Start", t[16];
    t = s;                         /* error: assignment to expression with array type */
    printf("%s\n", t);
    return 0;
}
