#!/bin/sh
# Same work, two traversal orders. -O1 keeps both loops as written (no vectorisation tricks).
mkdir -p out results
gcc -std=c17 -Wall -Wextra -O1 -o out/locality src/locality.c
./out/locality > results/locality.txt
cat results/locality.txt
