/* cpu.c - after the first program of OSTEP, chapter 2 (Arpaci-Dusseau,
 * Operating Systems: Three Easy Pieces). The program only spins on the
 * CPU and, once per second of wall-clock time, prints its name and how
 * many loop iterations it managed in that second. Run several copies at
 * once and the operating system shares the CPU among them.
 *
 * Usage: cpu NAME [SECONDS]
 */
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

static double now(void)
{
    struct timespec ts;
    timespec_get(&ts, TIME_UTC);          /* C11 wall-clock time */
    return ts.tv_sec + ts.tv_nsec / 1e9;
}

int main(int argc, char *argv[])
{
    if (argc < 2) {
        fprintf(stderr, "usage: cpu NAME [SECONDS]\n");
        return 1;
    }
    int seconds = argc > 2 ? atoi(argv[2]) : 5;
    double start = now(), next = start + 1.0;
    long long loops = 0;

    for (int s = 1; s <= seconds; ) {
        loops++;
        if ((loops & 0xFFFF) == 0 && now() >= next) {
            printf("%s: second %d, %4lld million loops\n", argv[1], s, loops / 1000000);
            fflush(stdout);
            loops = 0;
            next += 1.0;
            s++;
        }
    }
    return 0;
}
