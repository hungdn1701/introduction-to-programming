#!/bin/sh
# The session reads tests/inventory/1.in; awk puts each typed line after its
# prompt ("Enter ...: "), as it appears in a terminal: the typed Enter ends the line,
# so the program's own newline after a prompt shows as an empty line.
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/inventory src/inventory.c
./out/inventory < tests/inventory/1.in | tr -d '\r' > out/session-raw.txt
awk 'NR == FNR { typed[++n] = $0; next }
     { line = $0
       while (match(line, /Enter [a-z ]*: /)) {
           print substr(line, 1, RSTART + RLENGTH - 1) typed[++k]
           line = substr(line, RSTART + RLENGTH)
       }
       print line }' tests/inventory/1.in out/session-raw.txt | sed '$ { /^$/ d; }' > results/session.txt
# Two excerpts for the slides: the first insert and the duplicate, then update and print.
sed -n '1,5p;16,18p' results/session.txt > results/session-insert.txt
sed -n '25,33p' results/session.txt > results/session-print.txt
# Regression test: the expected outputs were checked by hand once; judge.sh
# compares every later version against them. inventory_nodup.c (made by awk)
# drops the duplicate check in insert.
J=../v11-testing/judge.sh
awk '/find_part\(inv, \*num_parts, number\) >= 0/ { skip = 4 } skip > 0 { skip--; next } { print }' src/inventory.c > out/inventory_nodup.c
{ sh $J src/inventory.c tests/inventory; sh $J out/inventory_nodup.c tests/inventory; } > results/judge-inventory.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
