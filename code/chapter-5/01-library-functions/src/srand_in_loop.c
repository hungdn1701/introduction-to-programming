/* srand_in_loop.c - a common mistake: calling srand inside the loop. Within one
 * second time(NULL) is the same, so every roll restarts the same sequence. */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
int main(void)
{
    int count[7] = {0};
    for (int i = 0; i < 6000; i++) {
        srand((unsigned) time(NULL));
        count[rand() % 6 + 1]++;
    }
    printf("face 1-6: %d %d %d %d %d %d\n", count[1], count[2], count[3], count[4], count[5], count[6]);
    return 0;
}
