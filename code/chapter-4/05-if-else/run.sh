#!/bin/sh
# Judge three versions of the triangle program (the third swaps the equilateral and isosceles branches) with the ten test cases designed in Chapter 2
# (judge.sh of the testing part), then show the empty-body warning.
mkdir -p out results
J=../v11-testing/judge.sh
# awk breaks each one-line verdict before test 06 so that it fits the slide.
{ sh $J src/triangle_v1.c tests/triangle; sh $J src/triangle.c tests/triangle; } | awk '{ sub(/ test 06/, "\n    test 06"); print }' > results/judge-triangle.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra triangle_order.c -o triangle_order'
    (cd src && gcc -std=c17 -Wall -Wextra triangle_order.c -o ../out/triangle_order 2>&1)
    echo '$ sh judge.sh triangle_order.c tests/triangle'
    sh $J src/triangle_order.c tests/triangle | awk '{ sub(/ test 06/, "\n    test 06"); print }'
} > results/judge-order.txt
for t in tests/triangle/08.in; do gcc -std=c17 -O2 -o out/t1 src/triangle_v1.c; echo "\$ ./triangle_v1 < $(basename $t)  ($(cat $t))"; ./out/t1 < $t; done > results/v1-case08.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra empty_body.c -o empty_body'
    (cd src && gcc -std=c17 -Wall -Wextra empty_body.c -o ../out/empty_body 2>&1)
    echo '$ ./empty_body'
    ./out/empty_body
} > results/empty-body.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
