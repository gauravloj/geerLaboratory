/*
    printf : Function to print formated string to standard output
    syntax : printf("formated string", var1, var2, ...);
        - formated string contains placeholders for different types of values
        - var1, var2 : values to be substituted in the formated string
        - Different placeholders for different types : 
            - %s : strings
            - %d : integers
            - %f : float
            - %c : character
            - %l : long integer
            - %e : float in exponential form
            - %g : either %f or %e
            - %p : pointers

    scanf : Function to get formated values from standard input
    syntax : scanf("formated string", &var1, &var2, ...);
        - &var will give address of the variable var1

    Note: number of placeholders in formatted strings should match number of variables given

*/
#include <stdio.h>

int main () {
    int i;
    printf("Enter any integer: ");
    scanf("%d", &i);
    printf("Voila, you just entered %d\n", i);
    return 0;
}