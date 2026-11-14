/* factorial.c - n! = n * (n-1)!, 0! = 1 (Sedgewick, Algorithms in C, ch. 5).
 * With argument "trace" it prints each call and return, indented by depth. */
#include <stdio.h>
#include <string.h>

static int trace = 0;

long long factorial(int n, int depth)
{
    if (trace)
        printf("%*scall factorial(%d)\n", 2 * depth, "", n);
    if (n == 0) {                                   /* base case */
        if (trace)
            printf("%*sreturn 1\n", 2 * depth, "");
        return 1;
    }
    long long r = n * factorial(n - 1, depth + 1);  /* recursive case */
    if (trace)
        printf("%*sreturn %lld\n", 2 * depth, "", r);
    return r;
}

int main(int argc, char *argv[])
{
    if (argc > 1 && strcmp(argv[1], "trace") == 0) {
        trace = 1;
        factorial(3, 0);
        return 0;
    }
    for (int n = 0; n <= 10; n++)
        printf("%2d! = %lld\n", n, factorial(n, 0));
    return 0;
}
