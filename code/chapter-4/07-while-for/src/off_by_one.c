#include <stdio.h>

int main(void)
{
    int count = 0;
    for (int i = 1; i < 10; i++)
        count++;
    printf("for (i = 1; i < 10; i++) runs %d times\n", count);

    count = 0;
    for (int i = 0; i < 10; i++)
        count++;
    printf("for (i = 0; i < 10; i++) runs %d times\n", count);
    return 0;
}
