/* crack.c - break a Caesar cipher by frequency analysis (al-Kindi, 9th century; Singh, The Code Book,
 * ch. 1): count the letters with count[c - 'a']++, take the most frequent one as 'e', the most common
 * letter of English (Poe, The Gold-Bug, 1843), and derive the key. Usage: crack < ciphertext
 * The method needs enough text: in a short sentence another letter may be the most frequent. */
#include <ctype.h>
#include <stdio.h>

#define LINES 10
#define LEN 100

void encrypt(char s[], int key)
{
    for (int i = 0; s[i] != '\0'; i++) {
        unsigned char c = s[i];
        if (isupper(c))
            s[i] = 'A' + (c - 'A' + key) % 26;
        else if (islower(c))
            s[i] = 'a' + (c - 'a' + key) % 26;
    }
}

int main(void)
{
    char text[LINES][LEN];
    int count[26] = {0};
    int n = 0;

    while (n < LINES && fgets(text[n], LEN, stdin) != NULL) {
        for (int i = 0; text[n][i] != '\0'; i++) {
            unsigned char c = text[n][i];
            if (isalpha(c))
                count[tolower(c) - 'a']++;
        }
        n++;
    }

    int top = 0;
    for (int k = 1; k < 26; k++)
        if (count[k] > count[top])
            top = k;
    int key = (top - ('e' - 'a') + 26) % 26;
    printf("most frequent: '%c', %d times -> key %d\n", 'a' + top, count[top], key);

    for (int i = 0; i < n; i++) {
        encrypt(text[i], 26 - key);       /* shifting by 26 - key undoes key */
        printf("%s", text[i]);
    }
    return 0;
}
