/*
- Strigs are one dimensional character array terminated by null character '\0'
- Hence, size of string array is 1 more than the number of characters in the string
- Refer 'images/string-operations.png' for some supported string operations
- To perform string operations, import 'string.h'

*/

#include <stdio.h>
#include <string.h>  // Includes all the functions related to string operations. Eg. strlen


int main () {
    // Inline Array initialization
    char a[6] = {'B', 'e', 'l', 'l', 'a', '\0'};
    char b[5] = "Ciao";  // Null character is not required in string constant. It is handled by compiler

    printf("%s %s\n", a, b);
    printf("String length is %ld\n", strlen(a));
}

