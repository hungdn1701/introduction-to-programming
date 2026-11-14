#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/daytab src/daytab.c && ./out/daytab > results/daytab.txt
gcc -std=c17 -Wall -Wextra -o out/matrix_sum src/matrix_sum.c && ./out/matrix_sum > results/matrix-sum.txt
gcc -std=c17 -Wall -Wextra -o out/magic src/magic.c && ./out/magic > results/magic.txt
gcc -std=c17 -Wall -Wextra -o out/row_major src/row_major.c && ./out/row_major > results/row-major.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra comma_bug.c -o comma_bug'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret comma_bug.c -o ../out/comma_bug 2>&1 | uniq)
} > results/comma-bug.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
