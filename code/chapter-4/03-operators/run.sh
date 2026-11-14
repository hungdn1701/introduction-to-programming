#!/bin/sh
mkdir -p out results
for p in leap digits; do
    gcc -std=c17 -Wall -Wextra -o out/$p src/$p.c && ./out/$p > results/$p.txt
done
{
    echo '$ gcc -std=c17 -Wall -Wextra assign_bug.c -o assign_bug'
    (cd src && gcc -std=c17 -Wall -Wextra assign_bug.c -o ../out/assign_bug 2>&1)
    echo '$ ./assign_bug'
    ./out/assign_bug
} > results/assign-bug.txt
cat results/*.txt
