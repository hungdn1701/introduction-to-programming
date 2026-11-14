#include <stdio.h>

int main(void)
{
    char line[10];
    gets(line);                /* removed from C11: no size limit */
    printf("%s\n", line);
    return 0;
}
