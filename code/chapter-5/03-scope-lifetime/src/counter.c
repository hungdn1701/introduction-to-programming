/* counter.c - a local variable is created at each call; a static local
 * variable keeps its value between calls (K&R 4.6). */
#include <stdio.h>

void count_local(void)
{
    int calls = 0;
    calls++;
    printf("local : call %d\n", calls);
}

void count_static(void)
{
    static int calls = 0;
    calls++;
    printf("static: call %d\n", calls);
}

int main(void)
{
    for (int i = 0; i < 3; i++)
        count_local();
    for (int i = 0; i < 3; i++)
        count_static();
    return 0;
}
