#!/bin/sh
mkdir -p out results
for p in numdigits numdigits_while prime scores sum_valid; do
    gcc -std=c17 -Wall -Wextra -o out/$p src/$p.c
done
{
    for n in 2026 0; do echo "\$ echo $n | ./numdigits"; echo $n | ./out/numdigits; done
    echo '$ echo 0 | ./numdigits_while'; echo 0 | ./out/numdigits_while
} > results/numdigits.txt
{ for n in 97 91; do echo "\$ echo $n | ./prime"; echo $n | ./out/prime; done; } > results/prime.txt
{ echo '$ printf "12\n-1\n8\n" | ./scores'; printf '12\n-1\n8\n' | ./out/scores; } > results/scores.txt
{ echo '$ echo 8 -1 6 9 -5 7 | ./sum_valid'; echo 8 -1 6 9 -5 7 | ./out/sum_valid; } > results/sum-valid.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
