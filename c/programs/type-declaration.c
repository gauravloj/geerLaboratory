#include <stdio.h>

int main () {
    // declaration with initializtion
    int i = 22;
    // declaration without initializtion
    int j,k,l;

    j = k = l = 45;

    // Invalid declaration
    // int j = k = l = 45;

    // Order of declaration : variables are declared fomr left to right
    // float a = 2.3, b = a;

    printf("Enter any integer: ");
    scanf("%d", &i);
    printf("Voila, you just entered %d\n", i);
    return 0;
}