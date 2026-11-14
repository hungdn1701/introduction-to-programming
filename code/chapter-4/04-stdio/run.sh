#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/addfrac src/addfrac.c
gcc -std=c17 -Wall -Wextra -o out/formats src/formats.c
{ echo '$ ./addfrac < good.txt'; ./out/addfrac < input/good.txt; } > results/addfrac-good.txt
{ echo '$ ./addfrac < bad.txt'; ./out/addfrac < input/bad.txt; echo "[exit code $?]"; } > results/addfrac-bad.txt
./out/formats > results/formats.txt
sed 's/&num1, &denom1/num1, denom1/' src/addfrac.c > out/no_ampersand.c
{
    echo '$ gcc -std=c17 -Wall -Wextra no_ampersand.c'
    (cd out && gcc -std=c17 -Wall -Wextra -c no_ampersand.c 2>&1)
} > results/no-ampersand.txt
for v in strict loose; do
    gcc -std=c17 -Wall -Wextra -o out/fraction_$v src/fraction_$v.c
    for x in "5/6" "5 / 6"; do echo "$ echo \"$x\" | ./fraction_$v"; echo "$x" | ./out/fraction_$v; done
done > results/fraction-space.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
