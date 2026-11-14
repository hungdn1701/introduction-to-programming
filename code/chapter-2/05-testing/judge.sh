#!/bin/sh
# judge.sh - a minimal automated judge in the style of ICPC contests.
# Usage: judge.sh SOURCE.c TESTDIR
# For each TESTDIR/k.in, run the program with standard input redirected from the file, a time limit
# of 2 seconds, and compare standard output byte by byte with TESTDIR/k.out (after dropping the CR that
# Windows adds before each line feed).
#   CE  compile error           TLE  time limit exceeded
#   RE  runtime error           WA   wrong answer           AC  accepted (all tests pass)
src=$1; tests=$2
exe=out/$(basename "$src" .c)
mkdir -p out
if ! gcc -std=c17 -O2 -o "$exe" "$src" 2>/dev/null; then
    echo "$(basename "$src"): CE"
    exit 0
fi
verdict=AC; line=""
for input in "$tests"/*.in; do
    k=$(basename "$input" .in)
    timeout 2 "$exe" < "$input" > out/actual.txt 2>/dev/null
    code=$?
    if [ $code -eq 124 ]; then r=TLE
    elif [ $code -ne 0 ]; then r=RE
    elif tr -d '\r' < out/actual.txt | cmp -s - "$tests/$k.out"; then r=ok   # Windows prints CR LF: drop CR
    else r=WA
    fi
    line="$line test $k: $r;"
    [ "$r" != ok ] && [ "$verdict" = AC ] && verdict="$r on test $k"
done
echo "$(basename "$src"):$line => $verdict"
