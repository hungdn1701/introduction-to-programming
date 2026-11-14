#!/bin/sh
mkdir -p out results
for p in temperature sizes divide_last; do
    gcc -std=c17 -Wall -Wextra -o out/$p src/$p.c && ./out/$p > results/$p.txt
done
{
    echo '$ gcc -std=c17 -Wall -Wextra overflow.c -o overflow'
    (cd src && gcc -std=c17 -Wall -Wextra overflow.c -o ../out/overflow 2>&1)
    echo '$ ./overflow'
    ./out/overflow
} > results/overflow.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
