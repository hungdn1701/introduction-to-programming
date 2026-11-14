#include <stdio.h>

int main(void)
{
    double position, initial = 1.5, rate = 2.0;
    int unused;
    position = initial + rate * 60;
    printf("%f\n", position);
    return 0;
}
