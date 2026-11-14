#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -O1 -o out/search_steps src/search_steps.c
./out/search_steps > results/search-steps.txt
# Doubling experiment (Sedgewick & Wayne §1.4): each n is timed five times, the shortest time is kept
gcc -std=c17 -Wall -Wextra -O1 -o out/doubling src/doubling.c
./out/doubling > results/doubling.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
