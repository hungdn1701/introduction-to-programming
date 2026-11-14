#include <stdio.h>

static char daytab[2][13] = {
    {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31},
    {0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31}
};

int main(void)
{
    printf("%d\n", daytab[1][2]);
    printf("%d\n", daytab[1, 2]);   /* wrong: comma operator, not [1][2] */
    return 0;
}
