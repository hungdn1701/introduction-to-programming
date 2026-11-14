// Bank.java - code outside the class tries to set the balance directly.
public class Bank {
    public static void main(String[] args) {
        Account acc = new Account();
        acc.balance = -1000;
    }
}
