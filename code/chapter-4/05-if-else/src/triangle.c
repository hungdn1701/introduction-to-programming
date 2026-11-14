/* triangle.c - Myers' triangle problem (The Art of Software Testing, 1979):
 * read three integer sides, print the kind of triangle. */
#include <stdio.h>

int main(void)
{
    int a, b, c;
    if (scanf("%d %d %d", &a, &b, &c) != 3)
        return 1;

    if (a <= 0 || b <= 0 || c <= 0 ||
        a + b <= c || a + c <= b || b + c <= a) {
        printf("NOT A TRIANGLE\n");
    } else if (a == b && b == c) {
        printf("EQUILATERAL\n");
    } else if (a == b || b == c || a == c) {
        printf("ISOSCELES\n");
    } else {
        printf("SCALENE\n");
    }
    return 0;
}
