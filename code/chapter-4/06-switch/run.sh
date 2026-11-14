#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/date src/date.c
for d in 3/6/2026 21/11/2026 12/1/2027 2/9/2026; do
    echo "$d" | ./out/date
    echo
done | grep Dated > results/date.txt
{ echo '$ echo 3/13/2026 | ./date'; echo 3/13/2026 | ./out/date | grep Dated; } > results/date-invalid.txt
# Switch on the operator character (calc.c)
gcc -std=c17 -Wall -Wextra -o out/calc src/calc.c
for e in "7 + 2" "7 / 2" "7 / 0" "7 % 2"; do echo "\$ echo $e | ./calc"; echo "$e" | ./out/calc; done > results/calc.txt
# Remove the break after "nd": case 2 falls through into case 3
awk '/printf\("nd"\); break;/ { sub(/ break;/, ""); } { print }' src/date.c > out/date_nobreak.c
{
    echo '$ gcc -std=c17 -Wall -Wextra date_nobreak.c -o date_nobreak'
    (cd out && gcc -std=c17 -Wall -Wextra date_nobreak.c -o date_nobreak 2>&1)
    echo '$ echo 2/9/2026 | ./date_nobreak'
    echo 2/9/2026 | ./out/date_nobreak | grep Dated
} > results/date-nobreak.txt
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
