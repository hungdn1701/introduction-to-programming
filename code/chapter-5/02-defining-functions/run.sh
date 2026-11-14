#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/power src/power.c && ./out/power > results/power.txt
gcc -std=c17 -Wall -Wextra -o out/prime src/prime.c
{ for n in 97 91; do echo "\$ echo $n | ./prime"; echo $n | ./out/prime; done; } > results/prime.txt
gcc -std=c17 -Wall -Wextra -o out/goldbach src/goldbach.c
{ for n in 28 100; do echo "$ echo $n | ./goldbach"; echo $n | ./out/goldbach; done; } > results/goldbach.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra no_return.c -o no_return'
    (cd src && gcc -std=c17 -Wall -Wextra no_return.c -o ../out/no_return 2>&1)
} > results/no-return.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
