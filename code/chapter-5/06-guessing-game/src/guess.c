/* guess.c - asks the user to guess a hidden number (after King, C Programming:
 * A Modern Approach, 10.5). The program is split into functions; the secret
 * number is an external (global) variable. A command-line seed makes runs
 * repeatable for the recorded demo. */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MAX_NUMBER 100

/* external variable */
int secret_number;

/* prototypes */
void initialize_number_generator(int seed);
void choose_new_secret_number(void);
void read_guesses(void);

int main(int argc, char *argv[])
{
    char command;

    printf("Guess the secret number between 1 and %d.\n\n", MAX_NUMBER);
    initialize_number_generator(argc > 1 ? atoi(argv[1]) : 0);
    do {
        choose_new_secret_number();
        printf("A new number has been chosen.\n");
        read_guesses();
        printf("Play again? (Y/N) ");
        if (scanf(" %c", &command) != 1)
            break;
        printf("\n");
    } while (command == 'y' || command == 'Y');
    return 0;
}

/* initialize_number_generator: seed with the time, or with a fixed seed */
void initialize_number_generator(int seed)
{
    srand(seed ? (unsigned) seed : (unsigned) time(NULL));
}

/* choose_new_secret_number: a random number between 1 and MAX_NUMBER */
void choose_new_secret_number(void)
{
    secret_number = rand() % MAX_NUMBER + 1;
}

/* read_guesses: read guesses until one is correct, then print the count */
void read_guesses(void)
{
    int guess, num_guesses = 0;

    for (;;) {
        num_guesses++;
        printf("Enter guess: ");
        if (scanf("%d", &guess) != 1)
            exit(EXIT_FAILURE);             /* not a number: stop */
        if (guess == secret_number) {
            printf("You won in %d guesses!\n\n", num_guesses);
            return;
        } else if (guess < secret_number)
            printf("Too low; try again.\n");
        else
            printf("Too high; try again.\n");
    }
}
