#!/bin/sh
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/sort_demo src/sort_demo.c
./out/sort_demo > results/sort-demo.txt
# A package installed with pip: name, version, and the packages it depends on
# (the installation path and the list of local packages that use it are left out).
{
    echo '$ python -m pip show requests'
    python -m pip show requests | grep -E '^(Name|Version|Summary|Requires):'
} > results/pip-show.txt
# Which names the object file defines (T, t) and which it only calls (U, undefined), and where the
# executable takes qsort from: on Windows (MinGW-w64 UCRT) a system DLL loaded at run time.
{
    echo '$ gcc -std=c17 -Wall -Wextra -c sort_demo.c'
    gcc -std=c17 -Wall -Wextra -c src/sort_demo.c -o out/sort_demo.o
    echo "$ nm sort_demo.o | grep -E ' [TtU] [a-z]'"
    nm out/sort_demo.o | grep -E ' [TtU] [a-z]'
    echo '$ objdump -p sort_demo.exe | grep -E "utility|qsort"'
    objdump -p out/sort_demo.exe | grep -E "utility|qsort" | sed 's/^[[:space:]]*//' | expand
} > results/nm-symbols.txt
# What happens when stdlib.h is missing
sed '/#include <stdlib.h>/d' src/sort_demo.c > out/no_header.c
{
    echo '$ gcc -std=c17 -Wall -Wextra -c no_header.c'
    (cd out && gcc -std=c17 -Wall -Wextra -c no_header.c 2>&1)
    echo "[exit code $?]"
} > results/no-header.txt
cat results/*.txt
