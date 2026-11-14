#!/bin/sh
# Judge five submissions of the A + B problem against three tests.
mkdir -p results
for s in ab_ok ab_extra ab_int ab_loop ab_ce; do
    sh judge.sh submissions/$s.c tests/ab
done > results/judge-ab.txt
cat results/judge-ab.txt
