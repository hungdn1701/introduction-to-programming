#!/bin/sh
mkdir -p out results
for p in triangle_star pyramid multiplication pythagoras; do
    gcc -std=c17 -Wall -Wextra -o out/$p src/$p.c
done
./out/triangle_star > results/triangle-star.txt
{ echo '$ echo 4 | ./pyramid'; echo 4 | ./out/pyramid; } > results/pyramid.txt
./out/multiplication > results/multiplication.txt
J=../v11-testing/judge.sh
{ sh $J src/pyramid.c tests/pyramid; sh $J src/pyramid_trailing.c tests/pyramid; } > results/judge-pyramid.txt
./out/pythagoras > results/pythagoras.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
