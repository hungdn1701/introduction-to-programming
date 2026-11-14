/* guess2.c - the same game without the external variable: the secret number
 * is passed as a parameter (after King, 10.5, guess2.c), and a function that
 * plays by halving the range shows the 7-guess bound for 1..100. */
#include <stdio.h>
#include <stdlib.h>

#define MAX_NUMBER 100

int new_secret_number(void)
{
    return rand() % MAX_NUMBER + 1;
}

/* play_by_halving: guess the middle of the remaining range each time */
int play_by_halving(int secret)
{
    int low = 1, high = MAX_NUMBER, guesses = 0;
    for (;;) {
        int guess = low + (high - low) / 2;
        guesses++;
        if (guess == secret)
            return guesses;
        if (guess < secret) low = guess + 1;
        else high = guess - 1;
    }
}

int main(void)
{
    int worst = 0;
    for (int secret = 1; secret <= MAX_NUMBER; secret++) {
        int g = play_by_halving(secret);
        if (g > worst)
            worst = g;
    }
    printf("halving strategy, secrets 1..%d: at most %d guesses\n", MAX_NUMBER, worst);
    srand(7);
    int s = new_secret_number();
    printf("secret %d found in %d guesses\n", s, play_by_halving(s));
    return 0;
}
