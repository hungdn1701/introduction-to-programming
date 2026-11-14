#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/binsearch src/binsearch.c && ./out/binsearch > results/binsearch.txt
# Two excerpts for the slides: the trace of search 23, then the test cases and the comparison.
sed -n '1,5p' results/binsearch.txt > results/binsearch-trace.txt
sed -n '6,$p' results/binsearch.txt > results/binsearch-tests.txt
gcc -std=c17 -Wall -Wextra -o out/binsearch_stuck src/binsearch_stuck.c && ./out/binsearch_stuck > results/binsearch-stuck.txt
gcc -std=c17 -Wall -Wextra -O0 -o out/mid_overflow src/mid_overflow.c && ./out/mid_overflow > results/mid-overflow.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
