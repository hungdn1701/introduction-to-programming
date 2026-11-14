#!/bin/sh
# hello.c through the compilation system (CS:APP 1.2): preprocess, compile, assemble, link.
mkdir -p out results
cd out
gcc -std=c17 -E ../src/hello.c -o hello.i      # 1. preprocessor: hello.c -> hello.i
gcc -std=c17 -S hello.i -o hello.s              # 2. compiler: hello.i -> hello.s (assembly)
gcc -std=c17 -c hello.s -o hello.o              # 3. assembler: hello.s -> hello.o (object code)
gcc hello.o -o hello.exe                        # 4. linker: hello.o + C library -> hello.exe
{
    echo '$ wc -l hello.c hello.i hello.s'
    wc -l ../src/hello.c hello.i hello.s | sed 's#\.\./src/##'
    echo '$ ls -l hello.o hello.exe'
    ls -l hello.o hello.exe | awk '{print $5, $NF}'
    echo '$ ./hello.exe'
    ./hello.exe
} > ../results/steps.txt
awk '/^main:/,/seh_endproc/' hello.s | grep -v -F -e .seh_ > ../results/hello-s-main.txt
python ../src/hello.py > ../results/python.txt
cd ..
# The same undefined name in C and in Python: GCC rejects the program before it runs; Python runs line 1
# and stops at line 2. The traceback path is cut to the file name; GCC's long "note:" line is dropped.
{
    echo '$ gcc -std=c17 -Wall -Wextra name_error.c -o name_error'
    (cd src && gcc -std=c17 -Wall -Wextra -fno-diagnostics-show-caret name_error.c -o ../out/name_error 2>&1; echo "[exit code $?]") | grep -v 'note:'
    echo '$ python name_error.py'
    (cd src && python name_error.py 2>&1; echo "[exit code $?]") | sed 's#File ".*[\/]name_error.py"#File "name_error.py"#'
} > results/name-error.txt
cat results/steps.txt results/hello-s-main.txt results/python.txt results/name-error.txt
