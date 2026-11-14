/* account.c - a bank account in structured C: the data and the functions
 * that work on it are separate (cf. make-withdraw in SICP, 3.1.1). */
#include <stdio.h>

struct account {
    long balance;
};

void deposit(struct account *acc, long amount)
{
    acc->balance += amount;
}

int withdraw(struct account *acc, long amount)
{
    if (amount > acc->balance)
        return 0;                  /* refused: insufficient funds */
    acc->balance -= amount;
    return 1;
}

int main(void)
{
    struct account acc = {0};
    deposit(&acc, 100);
    withdraw(&acc, 30);
    printf("balance after deposit 100, withdraw 30: %ld\n", acc.balance);
    printf("withdraw 500 accepted? %d\n", withdraw(&acc, 500));
    acc.balance = -1000;           /* nothing stops code outside the functions */
    printf("balance after direct assignment: %ld\n", acc.balance);
    return 0;
}
