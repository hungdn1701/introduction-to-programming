#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/strings src/strings.c
{ echo "\$ echo 'Dang Ngoc Hung' | ./strings"; echo 'Dang Ngoc Hung' | ./out/strings; } > results/strings.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra overflow.c -o overflow'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret overflow.c -o ../out/overflow 2>&1)
    echo '$ ./overflow'
    ./out/overflow
} | fold -s -w 96 | sed 's/ *$//' > results/overflow.txt
# Long GCC warnings are wrapped with fold so that they fit the slide.
# gets: GCC (MinGW) warns; with an input longer than the array the process is stopped.
{
    echo '$ gcc -std=c17 -Wall -Wextra gets_demo.c -o gets_demo'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret gets_demo.c -o ../out/gets_demo 2>&1 | grep -v 'note:')
    echo "\$ echo 'a line much longer than ten characters' | ./gets_demo"
    echo 'a line much longer than ten characters' | ./out/gets_demo
    echo "[exit code $?: Segmentation fault]"
} 2>/dev/null | fold -s -w 96 | sed 's/ *$//' > results/gets.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
