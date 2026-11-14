#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/sorts src/sorts.c && ./out/sorts > results/sorts.txt
gcc -std=c17 -Wall -Wextra -o out/sorted_uses src/sorted_uses.c && ./out/sorted_uses > results/sorted-uses.txt
gcc -std=c17 -Wall -Wextra -o out/count src/count.c && ./out/count > results/count.txt
gcc -std=c17 -Wall -Wextra -O2 -o out/sort_time src/sort_time.c && ./out/sort_time > results/sort-time.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
