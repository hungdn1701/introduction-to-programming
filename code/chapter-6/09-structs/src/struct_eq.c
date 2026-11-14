#include <stdio.h>

struct point {
    int x;
    int y;
};

int main(void)
{
    struct point a = {1, 2}, b = {1, 2};
    if (a == b)
        printf("equal\n");
    return 0;
}
