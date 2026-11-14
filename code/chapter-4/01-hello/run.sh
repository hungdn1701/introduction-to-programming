#!/bin/sh
# The first C program (K&R 1.1): compile with the course flags, run, then two common mistakes.
mkdir -p out results
{
    echo '$ gcc --version'
    gcc --version | head -1
    echo '$ gcc -std=c17 -Wall -Wextra hello.c -o hello'
    (cd src && gcc -std=c17 -Wall -Wextra hello.c -o ../out/hello 2>&1)
    echo '$ ./hello'
    ./out/hello
} > results/hello.txt
{
    echo '$ ./hello_no_newline; echo "<- next prompt starts here"'
    gcc -std=c17 -Wall -Wextra src/hello_no_newline.c -o out/hello_no_newline
    ./out/hello_no_newline; echo "<- next prompt starts here"
} > results/no-newline.txt
{
    echo '$ gcc -std=c17 -Wall -Wextra hello_no_semicolon.c -o hello'
    (cd src && gcc -std=c17 -Wall -Wextra hello_no_semicolon.c -o ../out/bad 2>&1)
    echo "[exit code $?]"
} > results/no-semicolon.txt
cat results/*.txt
