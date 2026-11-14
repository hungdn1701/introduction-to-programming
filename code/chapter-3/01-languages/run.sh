#!/bin/sh
# One computation, five forms: LMC machine code, x86-64 assembly, C, Python, Java.
mkdir -p out results
gcc -std=c17 -Wall -Wextra -o out/lmc ../v03-instruction-cycle/src/lmc.c
{
    echo '$ lmc add.lmc   (machine code: 901 399 901 199 902 000)'
    printf '25\n17\n' | ./out/lmc ../v03-instruction-cycle/programs/add.lmc | grep OUTPUT | sed 's/.*-> //'
    echo '$ gcc sum.c -o sum && ./sum'
    gcc -std=c17 -Wall -Wextra -o out/sum src/sum.c && ./out/sum
    echo '$ python sum.py'
    python src/sum.py
    echo '$ java Sum.java'
    java src/Sum.java
} > results/five-forms.txt 2>&1
gcc -std=c17 -O0 -S src/sum.c -o out/sum.s
grep -E 'movl|addl' out/sum.s | head -6 > results/sum-s.txt
cat results/five-forms.txt results/sum-s.txt
