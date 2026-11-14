/* addfrac.c - add two fractions typed as 5/6 (after King, C Programming:
 * A Modern Approach, 3.2). This version also checks how many values
 * scanf really read. */
#include <stdio.h>

int main(void)
{
    int num1, denom1, num2, denom2, result_num, result_denom;

    printf("Enter first fraction: ");
    int n1 = scanf("%d/%d", &num1, &denom1);
    printf("Enter second fraction: ");
    int n2 = scanf("%d/%d", &num2, &denom2);

    if (n1 != 2 || n2 != 2) {
        printf("\nscanf read %d and %d values: input must look like 5/6\n", n1, n2);
        return 1;
    }
    result_num = num1 * denom2 + num2 * denom1;
    result_denom = denom1 * denom2;
    printf("The sum is %d/%d\n", result_num, result_denom);
    return 0;
}
