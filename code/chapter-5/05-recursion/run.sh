#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/factorial src/factorial.c
./out/factorial > results/factorial.txt
./out/factorial trace > results/factorial-trace.txt
gcc -std=c17 -Wall -Wextra -o out/hanoi src/hanoi.c
{ echo '$ ./hanoi 3'; ./out/hanoi 3; echo '$ ./hanoi 10'; ./out/hanoi 10; echo '$ ./hanoi 20'; ./out/hanoi 20; } > results/hanoi.txt
# No base case: GCC warns -Winfinite-recursion; the run ends in a stack overflow,
# reported by Windows as STATUS_STACK_OVERFLOW (0xC00000FD).
{
    echo '$ gcc -std=c17 -Wall -Wextra -O0 no_base_case.c -o no_base_case'
    (cd src && gcc -std=c17 -Wall -Wextra -O0 no_base_case.c -o ../out/no_base_case 2>&1)
    echo '> & .\no_base_case.exe; $LASTEXITCODE        (PowerShell)'
    powershell -NoProfile -Command '& .\out\no_base_case.exe | Out-Null; "{0} = 0x{0:X8}" -f $LASTEXITCODE'
} > results/no-base-case.txt 2>/dev/null
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
