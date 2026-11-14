#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/pointer src/pointer.c && ./out/pointer > results/pointer.txt
gcc -std=c17 -Wall -Wextra -o out/swap src/swap.c && ./out/swap > results/swap.txt
gcc -std=c17 -Wall -Wextra -o out/min_max src/min_max.c && ./out/min_max > results/min-max.txt
# Missing & in scanf. GCC (MinGW) prints the same warning twice; -fno-diagnostics-show-caret
# keeps one line per warning and uniq drops the repeated line.
# With n = 0, scanf gets the null address and writes nothing; with n = 12345 it writes
# to address 12345 and the process is stopped.
sed 's/int n = 0;/int n = 12345;/' src/no_ampersand.c > out/no_ampersand_12345.c
{
    echo '$ gcc -std=c17 -Wall -Wextra no_ampersand.c -o no_ampersand'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret no_ampersand.c -o ../out/no_ampersand 2>&1 | uniq)
    echo '$ echo 42 | ./no_ampersand                (int n = 0;)'
    echo 42 | ./out/no_ampersand
    echo "[exit code $?]"
    gcc -std=c17 -w -o out/no_ampersand_12345 out/no_ampersand_12345.c
    echo '$ echo 42 | ./no_ampersand_12345          (int n = 12345;)'
    echo 42 | ./out/no_ampersand_12345
    echo "[exit code $?: Segmentation fault]"
} > results/no-ampersand.txt 2>/dev/null
# Writing through NULL: Git Bash reports "Segmentation fault" (exit 139);
# Windows itself reports STATUS_ACCESS_VIOLATION (0xC0000005).
gcc -std=c17 -Wall -Wextra -o out/null_pointer src/null_pointer.c
{
    echo '$ ./null_pointer'
    ./out/null_pointer
    echo "[exit code $?: Segmentation fault]"
    echo '> & .\null_pointer.exe; $LASTEXITCODE        (PowerShell)'
    powershell -NoProfile -Command '& .\out\null_pointer.exe | Out-Null; "{0} = 0x{0:X8}" -f $LASTEXITCODE'
} > results/null-pointer.txt 2>/dev/null
# Programs print CRLF on Windows; keep results with LF.
for f in results/*.txt; do tr -d '\r' < "$f" > out/tmp.txt && mv out/tmp.txt "$f"; done
cat results/*.txt
