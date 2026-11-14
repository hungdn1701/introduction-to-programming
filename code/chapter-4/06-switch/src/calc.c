/* calc.c - a four-function calculator: read "a op b" and choose the operation with a switch on the
 * operator character, in the style of the calculator in K&R §4.3. A character constant such as '+' is
 * an integer (its code, 43 in ASCII), so it can be a case label. */
#include <stdio.h>

int main(void)
{
    int a, b;
    char op;
    if (scanf("%d %c %d", &a, &op, &b) != 3)
        return 1;

    switch (op) {
    case '+': printf("%d\n", a + b); break;
    case '-': printf("%d\n", a - b); break;
    case '*': printf("%d\n", a * b); break;
    case '/':
        if (b == 0)
            printf("division by zero\n");
        else
            printf("%d\n", a / b);
        break;
    default:
        printf("unknown operator %c\n", op);
        break;
    }
    return 0;
}
