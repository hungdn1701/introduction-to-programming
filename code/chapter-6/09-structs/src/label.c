/* label.c - structure assignment copies every member, an array member too (King, C Programming:
 * A Modern Approach, §16.2): a text label placed at a point of the screen of point.c. */
#include <stdio.h>
#include <string.h>

struct point {
    int x;
    int y;
};
typedef struct point Point;

struct label {
    char text[16];
    Point pos;
};

int main(void)
{
    struct label a = {"Start", {10, 20}};
    struct label b = a;            /* copies text[] and pos */
    strcpy(b.text, "Stop");
    b.pos.x = 300;
    printf("a: \"%s\" at (%d, %d)\n", a.text, a.pos.x, a.pos.y);
    printf("b: \"%s\" at (%d, %d)\n", b.text, b.pos.x, b.pos.y);
    return 0;
}
