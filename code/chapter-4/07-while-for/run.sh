#!/bin/sh
mkdir -p out results
for p in fahr_while fahr_for gcd off_by_one collatz; do
    gcc -std=c17 -Wall -Wextra -o out/$p src/$p.c
done
./out/fahr_while > results/fahr-while.txt
./out/fahr_for > results/fahr-for.txt
{ echo '$ echo 1071 462 | ./gcd'; echo 1071 462 | ./out/gcd; } > results/gcd.txt
./out/off_by_one > results/off-by-one.txt
{ for n in 6 27 28; do echo "$ echo $n | ./collatz"; echo $n | ./out/collatz; done; } > results/collatz.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
