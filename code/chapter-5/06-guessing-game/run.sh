#!/bin/sh
# Seed 2026 gives the secret number 55 with this C library (MinGW-w64 UCRT), so the
# recorded session can be replayed. The input is redirected from input/session.txt;
# awk puts each typed value after its prompt, as it appears in a terminal.
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/guess src/guess.c
gcc -std=c17 -Wall -Wextra -o out/guess2 src/guess2.c
./out/guess 2026 < input/session.txt | tr -d '\r' > out/guess-raw.txt
awk 'NR == FNR { typed[++n] = $0; next }
     index($0, "Enter guess: ") == 1 { print "Enter guess: " typed[++k]; print substr($0, 14); next }
     index($0, "Play again? (Y/N) ") == 1 { print "Play again? (Y/N) " typed[++k]; next }
     { print }' input/session.txt out/guess-raw.txt > results/guess-session.txt
./out/guess2 | tr -d '\r' > results/guess2.txt
cat results/*.txt
