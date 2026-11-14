#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/life src/life.c
{ echo '$ ./life glider'; ./out/life glider; } > results/glider.txt
{ echo '$ ./life blinker'; ./out/life blinker; } > results/blinker.txt
{ echo '$ ./life inplace'; ./out/life inplace; } > results/inplace.txt
{ echo '$ ./life glider 20'; ./out/life glider 20; } > results/glider-wall.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
