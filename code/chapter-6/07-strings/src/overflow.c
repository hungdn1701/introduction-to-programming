/* overflow.c - strcpy does not know the size of the destination: copying
 * 14 characters and '\0' into char name[10] writes past the array and
 * changes the variable stored next to it (observed with GCC 13, -O0). */
#include <stdio.h>
#include <string.h>

int main(void)
{
    int balance = 100;
    char name[10];

    printf("&name = %p, &balance = %p\n", (void *) name, (void *) &balance);
    strcpy(name, "Nguyen Van Anh");       /* 15 bytes into 10 */
    printf("name = %s, balance = %d\n", name, balance);
    return 0;
}
