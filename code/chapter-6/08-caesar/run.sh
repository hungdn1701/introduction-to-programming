#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/caesar src/caesar.c
{
    echo '$ ./caesar 3 < latin.txt'; ./out/caesar 3 < input/latin.txt
    echo '$ ./caesar 3 < latin.txt | ./caesar 23'; ./out/caesar 3 < input/latin.txt | ./out/caesar 23
} > results/caesar.txt
{ echo '$ ./caesar 3 < vietnamese.txt'; ./out/caesar 3 < input/vietnamese.txt; } > results/caesar-utf8.txt
gcc -std=c17 -Wall -Wextra -o out/crack src/crack.c
{
    echo '$ ./caesar 11 < goldbug.txt'; ./out/caesar 11 < input/goldbug.txt
    echo '$ ./caesar 11 < goldbug.txt | ./crack'; ./out/caesar 11 < input/goldbug.txt | ./out/crack
} > results/crack.txt
gcc -std=c17 -Wall -Wextra -o out/normalize src/normalize.c
{ echo '$ ./normalize < names.txt'; ./out/normalize < input/names.txt; } > results/normalize.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
