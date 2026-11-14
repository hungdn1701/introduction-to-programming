// Account.java - the same account as a class: the balance is private and
// changes only through the methods (encapsulation).
public class Account {
    private long balance;

    public void deposit(long amount) {
        balance += amount;
    }

    public boolean withdraw(long amount) {
        if (amount > balance) {
            return false;          // refused: insufficient funds
        }
        balance -= amount;
        return true;
    }

    public long getBalance() {
        return balance;
    }

    public static void main(String[] args) {
        Account acc = new Account();
        acc.deposit(100);
        acc.withdraw(30);
        System.out.println("balance after deposit 100, withdraw 30: " + acc.getBalance());
        System.out.println("withdraw 500 accepted? " + acc.withdraw(500));
    }
}
