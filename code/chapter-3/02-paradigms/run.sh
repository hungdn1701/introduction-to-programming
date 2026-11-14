#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/account src/account.c
./out/account > results/account-c.txt
javac -d out src/Account.java
java -cp out Account > results/account-java.txt
{
    echo '$ javac Bank.java'
    (cd src && javac -d ../out Account.java Bank.java 2>&1)
    echo "[exit code $?]"
} > results/bank-javac.txt
for p in gcd_goto gcd_while; do
    gcc -std=c17 -Wall -Wextra -o out/$p src/$p.c
    echo "$ echo 1071 462 | ./$p"; echo 1071 462 | ./out/$p
done | tr -d '\r' > results/gcd-goto-while.txt
cat results/*.txt
