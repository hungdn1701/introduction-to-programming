/* caesar.c - Caesar cipher (Suetonius, Life of Julius Caesar 56; Singh,
 * The Code Book, ch. 1): each letter is shifted by key positions in the
 * alphabet; other characters are unchanged. Usage: caesar KEY < text */
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>

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

int main(int argc, char *argv[])
{
    char line[100];
    int key = argc > 1 ? atoi(argv[1]) : 3;

    while (fgets(line, sizeof(line), stdin) != NULL) {
        encrypt(line, key);
        printf("%s", line);
    }
    return 0;
}
