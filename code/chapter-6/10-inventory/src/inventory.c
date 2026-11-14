/* inventory.c - maintains a parts database (King, C Programming: A Modern
 * Approach, 16.3). Changed from the book: the array and its count are local
 * to main and passed to the functions (as in guess2.c), not external
 * variables. Commands: i insert, s search, u update, p print, q quit. */
#include <ctype.h>
#include <stdio.h>

#define NAME_LEN 25
#define MAX_PARTS 100

struct part {
    int number;
    char name[NAME_LEN + 1];
    int on_hand;
};

int read_line(char str[], int n);
int find_part(const struct part inv[], int num_parts, int number);
void insert(struct part inv[], int *num_parts);
void search(const struct part inv[], int num_parts);
void update(struct part inv[], int num_parts);
void print(const struct part inv[], int num_parts);

int main(void)
{
    struct part inventory[MAX_PARTS];
    int num_parts = 0;                 /* number of parts currently stored */
    char code;
    int ch;

    for (;;) {
        printf("Enter operation code: ");
        if (scanf(" %c", &code) != 1)
            return 0;
        while ((ch = getchar()) != '\n' && ch != EOF)   /* skip to end of line */
            ;
        switch (code) {
        case 'i': insert(inventory, &num_parts); break;
        case 's': search(inventory, num_parts); break;
        case 'u': update(inventory, num_parts); break;
        case 'p': print(inventory, num_parts); break;
        case 'q': return 0;
        default:  printf("Illegal code\n");
        }
        printf("\n");
    }
}

/* find_part: index of the part with this number, or -1 */
int find_part(const struct part inv[], int num_parts, int number)
{
    for (int i = 0; i < num_parts; i++)
        if (inv[i].number == number)
            return i;
    return -1;
}

/* insert: add a new part at inv[*num_parts] if the number is new and
 * the array is not full */
void insert(struct part inv[], int *num_parts)
{
    int number;

    if (*num_parts == MAX_PARTS) {
        printf("Database is full; can't add more parts.\n");
        return;
    }
    printf("Enter part number: ");
    if (scanf("%d", &number) != 1)
        return;
    if (find_part(inv, *num_parts, number) >= 0) {
        printf("Part already exists.\n");
        return;
    }
    inv[*num_parts].number = number;
    printf("Enter part name: ");
    read_line(inv[*num_parts].name, NAME_LEN);
    printf("Enter quantity on hand: ");
    if (scanf("%d", &inv[*num_parts].on_hand) != 1)
        return;
    (*num_parts)++;
}

void search(const struct part inv[], int num_parts)
{
    int number;

    printf("Enter part number: ");
    if (scanf("%d", &number) != 1)
        return;
    int i = find_part(inv, num_parts, number);
    if (i >= 0) {
        printf("Part name: %s\n", inv[i].name);
        printf("Quantity on hand: %d\n", inv[i].on_hand);
    } else
        printf("Part not found.\n");
}

void update(struct part inv[], int num_parts)
{
    int number, change;

    printf("Enter part number: ");
    if (scanf("%d", &number) != 1)
        return;
    int i = find_part(inv, num_parts, number);
    if (i >= 0) {
        printf("Enter change in quantity on hand: ");
        if (scanf("%d", &change) == 1)
            inv[i].on_hand += change;
    } else
        printf("Part not found.\n");
}

void print(const struct part inv[], int num_parts)
{
    printf("Part Number   Part Name                  Quantity on Hand\n");
    for (int i = 0; i < num_parts; i++)
        printf("%7d       %-25s%11d\n", inv[i].number, inv[i].name, inv[i].on_hand);
}

/* read_line: skip leading white space, read the rest of the line into str,
 * at most n characters (King 13.3) */
int read_line(char str[], int n)
{
    int ch, i = 0;

    while (isspace(ch = getchar()))
        ;
    while (ch != '\n' && ch != EOF) {
        if (i < n)
            str[i++] = ch;
        ch = getchar();
    }
    str[i] = '\0';
    return i;
}
