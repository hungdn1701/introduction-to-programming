/* hanoi.c - Towers of Hanoi (Lucas, 1883; Sedgewick, Algorithms in C, ch. 5):
 * move n disks from peg A to peg C using peg B. */
#include <stdio.h>
#include <stdlib.h>

static long moves = 0;
static int print_moves = 1;

void hanoi(int n, char from, char via, char to)
{
    if (n == 0)                         /* base case: nothing to move */
        return;
    hanoi(n - 1, from, to, via);        /* move n-1 disks out of the way */
    moves++;
    if (print_moves)
        printf("move disk %d from %c to %c\n", n, from, to);
    hanoi(n - 1, via, from, to);        /* put them back on top */
}

int main(int argc, char *argv[])
{
    int n = argc > 1 ? atoi(argv[1]) : 3;
    print_moves = n <= 4;
    hanoi(n, 'A', 'B', 'C');
    printf("n = %d: %ld moves\n", n, moves);
    return 0;
}
