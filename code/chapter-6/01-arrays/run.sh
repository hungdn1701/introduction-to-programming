#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/reverse src/reverse.c
{ echo '$ echo 34 82 49 102 7 94 23 11 50 31 | ./reverse'; echo 34 82 49 102 7 94 23 11 50 31 | ./out/reverse; } > results/reverse.txt
gcc -std=c17 -Wall -Wextra -o out/repdigit src/repdigit.c
{ for n in 28212 2026 1357; do echo "\$ echo $n | ./repdigit"; echo $n | ./out/repdigit; done; } > results/repdigit.txt
# Out of bounds: at -O0 GCC gives no warning; at -O2 it warns. The run is the -O0 build.
# fold wraps the long warnings so that they fit the slide.
{
    echo '$ gcc -std=c17 -Wall -Wextra out_of_bounds.c -o out_of_bounds'
    (cd src && gcc -std=c17 -Wall -Wextra out_of_bounds.c -o ../out/out_of_bounds 2>&1)
    echo '$ ./out_of_bounds'
    ./out/out_of_bounds
    echo '$ gcc -std=c17 -Wall -Wextra -O2 out_of_bounds.c -o out_of_bounds_O2'
    (cd src && gcc -std=c17 -Wall -Wextra -O2 -fno-diagnostics-show-caret out_of_bounds.c -o ../out/out_of_bounds_O2 2>&1 | grep -v '^ *|' | grep -v 'note:')
} | fold -s -w 96 | sed 's/ *$//' > results/out-of-bounds.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
