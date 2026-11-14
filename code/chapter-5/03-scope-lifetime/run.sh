#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/swap_wrong src/swap_wrong.c && ./out/swap_wrong > results/swap-wrong.txt
gcc -std=c17 -Wall -Wextra -o out/counter src/counter.c && ./out/counter > results/counter.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra -O1 uninitialized.c -o uninitialized'
    (cd src && gcc -std=c17 -Wall -Wextra -O1 uninitialized.c -o ../out/uninitialized 2>&1)
} > results/uninitialized.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra stars.c -o stars'
    (cd src && gcc -std=c17 -Wall -Wextra stars.c -o ../out/stars 2>&1)
    echo '$ ./stars'
    ./out/stars
} > results/stars.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
