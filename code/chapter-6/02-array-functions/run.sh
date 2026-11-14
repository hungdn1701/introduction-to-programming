#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/array_stats src/array_stats.c && ./out/array_stats > results/array-stats.txt
gcc -std=c17 -Wall -Wextra -o out/max_init src/max_init.c && ./out/max_init > results/max-init.txt
gcc -std=c17 -Wall -Wextra -o out/sieve src/sieve.c && ./out/sieve > results/sieve.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra sizeof_param.c -o sizeof_param'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret sizeof_param.c -o ../out/sizeof_param 2>&1)
    echo '$ ./sizeof_param'
    ./out/sizeof_param
} > results/sizeof-param.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
