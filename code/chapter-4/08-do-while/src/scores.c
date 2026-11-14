/* scores.c - read a score with do-while and ask again until it lies in 0..10. */
#include <stdio.h>

int main(void)
{
    int score;
    do {
        printf("Score (0-10): ");
        if (scanf("%d", &score) != 1)
            return 1;
    } while (score < 0 || score > 10);
    printf("\naccepted: %d\n", score);
    return 0;
}
