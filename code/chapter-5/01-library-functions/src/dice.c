/* dice.c - roll a six-sided die 6000 times with rand() % 6 + 1 and count each
 * face (after Deitel & Deitel, C How to Program). With argument "seed" the
 * generator is seeded with the current time; without it, every run gives the
 * same sequence. */
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

int main(int argc, char *argv[])
{
    int count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0;

    if (argc > 1 && strcmp(argv[1], "seed") == 0)
        srand((unsigned) time(NULL));

    printf("first five rolls:");
    for (int i = 1; i <= 6000; i++) {
        int face = rand() % 6 + 1;
        if (i <= 5)
            printf(" %d", face);
        switch (face) {
        case 1: count1++; break;
        case 2: count2++; break;
        case 3: count3++; break;
        case 4: count4++; break;
        case 5: count5++; break;
        case 6: count6++; break;
        }
    }
    printf("\nface 1-6: %d %d %d %d %d %d\n", count1, count2, count3, count4, count5, count6);
    return 0;
}
