#!/bin/sh
# One small file per kind of error, compiled with GCC; messages are copied as printed
# (the path of ld.exe is shortened to its name).
mkdir -p out results
short() { sed -e 's#^.*/ld\.exe:#ld.exe:#'; }
for f in lexical syntax semantic warning; do
    {
        echo "\$ gcc -std=c17 -Wall -Wextra $f.c -o $f"
        (cd src && gcc -std=c17 -Wall -Wextra $f.c -o ../out/$f 2>&1)
        echo "[exit code $?]"
    } | short > results/$f.txt
done
# link.c: compile and link as two steps, so each message shows which step it comes from
{
    echo '$ gcc -std=c17 -Wall -Wextra -c link.c -o link.o'
    (cd src && gcc -std=c17 -Wall -Wextra -c link.c -o ../out/link.o 2>&1)
    echo "[exit code $?]"
    echo '$ gcc link.o -o link'
    (cd out && gcc link.o -o link 2>&1)
    echo "[exit code $?]"
} | short > results/link.txt
gcc -std=c17 -O0 -S src/position.c -o out/position-O0.s
gcc -std=c17 -O2 -S src/position.c -o out/position-O2.s
cat results/*.txt
