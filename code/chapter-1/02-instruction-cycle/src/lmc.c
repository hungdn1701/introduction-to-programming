/* lmc.c - a Little Man Computer simulator (Madnick, MIT, 1965).
 *
 * Memory: 100 mailboxes, each holding a 3-digit decimal number.
 * Registers: PC (program counter), IR (instruction register),
 *            ACC (accumulator).
 * Instruction = opcode digit + 2-digit address:
 *   1xx ADD  2xx SUB  3xx STA  5xx LDA  6xx BRA  7xx BRZ  8xx BRP
 *   901 INP  902 OUT  000 HLT
 *
 * Usage: lmc program.lmc < input.txt
 * The program file holds one instruction per line ("901", or
 * "901 ; comment"); line k is loaded into mailbox k.
 * After each instruction the simulator prints PC, IR, ACC and one
 * data mailbox, so the instruction cycle can be traced step by step.
 */
#include <stdio.h>
#include <stdlib.h>

#define MAILBOXES 100

static const char *name(int op, int ir)
{
    switch (op) {
    case 1: return "ADD";
    case 2: return "SUB";
    case 3: return "STA";
    case 5: return "LDA";
    case 6: return "BRA";
    case 7: return "BRZ";
    case 8: return "BRP";
    case 9: return ir == 901 ? "INP" : "OUT";
    default: return "HLT";
    }
}

int main(int argc, char *argv[])
{
    int mem[MAILBOXES] = {0};
    int pc = 0, ir = 0, acc = 0, step = 0;
    int watch = argc > 2 ? atoi(argv[2]) : 99;   /* data mailbox to show */
    char line[128];
    FILE *f;

    if (argc < 2 || (f = fopen(argv[1], "r")) == NULL) {
        fprintf(stderr, "usage: lmc program.lmc [mailbox] < input\n");
        return 1;
    }
    for (int k = 0; k < MAILBOXES && fgets(line, sizeof line, f) != NULL; k++)
        mem[k] = atoi(line);
    fclose(f);

    printf("step  PC  IR   instruction  ACC  mailbox %02d\n", watch);
    for (;;) {
        ir = mem[pc];            /* FETCH: copy the instruction at PC into IR */
        pc = pc + 1;             /*        and point PC to the next one       */
        int op = ir / 100;       /* DECODE: opcode and address                */
        int addr = ir % 100;
        int out = 0, halt = 0;

        switch (op) {            /* EXECUTE                                   */
        case 1: acc = acc + mem[addr]; break;
        case 2: acc = acc - mem[addr]; break;
        case 3: mem[addr] = acc; break;
        case 5: acc = mem[addr]; break;
        case 6: pc = addr; break;
        case 7: if (acc == 0) pc = addr; break;
        case 8: if (acc >= 0) pc = addr; break;
        case 9:
            if (ir == 901) {
                if (scanf("%d", &acc) != 1) acc = 0;
            } else {
                out = 1;
            }
            break;
        default: halt = 1; break;
        }

        step++;
        printf("%4d  %02d  %03d  %s", step, pc, ir, name(op, ir));
        printf(op >= 1 && op <= 8 ? " %02d       " : "          ", addr);
        printf("%3d  %3d", acc, mem[watch]);
        if (out)
            printf("   -> OUTPUT %d", acc);
        printf("\n");
        if (halt || step >= 1000)
            break;
    }
    return 0;
}
