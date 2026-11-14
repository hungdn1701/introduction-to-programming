/* null_pointer.c - writing through a pointer that points to nothing.
 * The operating system stops the process (access violation on Windows,
 * segmentation fault on Linux). */
#include <stdio.h>

int main(void)
{
    int *p = NULL;             /* p points to nothing */
    printf("before *p = 7\n");
    fflush(stdout);
    *p = 7;                    /* write through a NULL pointer */
    printf("after *p = 7\n");
    return 0;
}
