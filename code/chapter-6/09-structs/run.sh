#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/point src/point.c && ./out/point > results/point.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra struct_eq.c -o struct_eq'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret struct_eq.c -o ../out/struct_eq 2>&1)
} > results/struct-eq.txt
gcc -std=c17 -Wall -Wextra -o out/label src/label.c
{
    echo '$ ./label'
    ./out/label
    echo '$ gcc -std=c17 -Wall -Wextra array_assign.c -o array_assign'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret array_assign.c -o ../out/array_assign 2>&1)
} > results/label.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
