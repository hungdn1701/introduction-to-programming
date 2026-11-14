/* normalize.c - normalizes a person's name: removes extra spaces, capitalizes
 * the first letter of each word, lowercases the rest (ASCII letters only). */
#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <string.h>

void normalize(const char src[], char dst[])
{
    int j = 0;
    bool new_word = true;

    for (int i = 0; src[i] != '\0'; i++) {
        unsigned char c = src[i];
        if (isspace(c)) {
            new_word = true;
            continue;
        }
        if (new_word && j > 0)
            dst[j++] = ' ';                /* one space between words */
        dst[j++] = new_word ? toupper(c) : tolower(c);
        new_word = false;
    }
    dst[j] = '\0';
}

int main(void)
{
    char line[100], name[100];

    while (fgets(line, sizeof(line), stdin) != NULL) {
        int n = strlen(line);
        if (n > 0 && line[n - 1] == '\n')
            line[n - 1] = '\0';
        normalize(line, name);
        printf("[%s] -> [%s]\n", line, name);
    }
    return 0;
}
