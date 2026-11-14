#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/hypotenuse src/hypotenuse.c -lm
./out/hypotenuse > results/hypotenuse.txt
gcc -std=c17 -Wall -Wextra -o out/dice src/dice.c
{
    echo '$ ./dice        (run 1, no srand)'; ./out/dice
    echo '$ ./dice        (run 2, no srand)'; ./out/dice
} > results/dice-no-seed.txt
{
    echo '$ ./dice seed   (run 1)'; ./out/dice seed
    sleep 1
    echo '$ ./dice seed   (run 2)'; ./out/dice seed
} > results/dice-seed.txt
gcc -std=c17 -Wall -Wextra -o out/srand_in_loop src/srand_in_loop.c
{ echo '$ ./srand_in_loop'; ./out/srand_in_loop; } > results/srand-in-loop.txt
sed '/#include <math.h>/d' src/hypotenuse.c > out/no_math.c
{
    echo '$ gcc -std=c17 -Wall -Wextra -c no_math.c'
    (cd out && gcc -std=c17 -Wall -Wextra -c no_math.c 2>&1)
    echo "[exit code $?]"
} > results/no-math-header.txt
# abs with a double argument: fold wraps the long warning so that it fits the slide.
{
    echo '$ gcc -std=c17 -Wall -Wextra abs_fabs.c -o abs_fabs'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret abs_fabs.c -o ../out/abs_fabs -lm 2>&1)
    echo '$ ./abs_fabs'
    ./out/abs_fabs
} | fold -s -w 96 | sed 's/ *$//' > results/abs-fabs.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
