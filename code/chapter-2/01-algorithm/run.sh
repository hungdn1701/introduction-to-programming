#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/euclid_trace src/euclid_trace.c
gcc -std=c17 -Wall -Wextra -o out/euclid_sub_trace src/euclid_sub_trace.c
./out/euclid_trace 1071 462 > results/euclid-1071-462.txt
./out/euclid_trace 12 18 > results/euclid-12-18.txt
./out/euclid_sub_trace 1071 462 > results/euclid-sub-1071-462.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
