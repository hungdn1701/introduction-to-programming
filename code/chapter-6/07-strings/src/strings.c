/* strings.c - a string is a char array ending with '\0' (K&R 1.9, 2.3):
 * strlen and sizeof, K&R's own strlen, strcmp, strcpy and strcat, and a line
 * read with fgets. */
#include <stdio.h>
#include <string.h>

/* my_strlen: return length of s (K&R 2.3) */
int my_strlen(const char s[])
{
    int i = 0;
    while (s[i] != '\0')
        ++i;
    return i;
}

int main(void)
{
    char s[10] = "hello";
    char t[20];
    char line[40];

    printf("strlen(s) = %d, sizeof(s) = %d, my_strlen(s) = %d\n",
           (int) strlen(s), (int) sizeof(s), my_strlen(s));
    printf("strcmp(\"apple\", \"banana\") = %d\n", strcmp("apple", "banana"));
    strcpy(t, s);
    strcat(t, ", world");
    printf("t = \"%s\", strlen(t) = %d\n", t, (int) strlen(t));

    if (fgets(line, sizeof(line), stdin) == NULL)
        return 1;
    int n = strlen(line);
    printf("fgets read %d characters: [%s]\n", n, line);
    if (n > 0 && line[n - 1] == '\n')
        line[n - 1] = '\0';                /* remove the newline */
    printf("without the newline: [%s]\n", line);
    return 0;
}
