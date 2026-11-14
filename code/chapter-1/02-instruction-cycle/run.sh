#!/bin/sh
# Build and run the Little Man Computer simulator (Git Bash on Windows, or any POSIX shell).
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/lmc src/lmc.c
printf '25\n17\n' | ./out/lmc programs/add.lmc > results/lmc-add.txt
printf '2\n' | ./out/lmc programs/countdown.lmc 6 > results/lmc-countdown.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
