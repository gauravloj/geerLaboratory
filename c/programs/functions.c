/*

Functions are self contained blocks of statement that will be executed only when 
    main function or another function calls them.

Structure of a function : refer 'images/structure-of-function.png'
    - Return type: Data type of the value returned by the function
    - Function name : Literal name of the function by which the function will be called from other function
    - parameters (optional) : list of parameters to be passed to the function as input
    - body : Actual logic that functions needs to perform in given parameters to calculate the output value to be returned

1. A c program will contain at least one function which is 'main' function
2. A recursive function is a function that calls itself. There must be a terminating condition so that recursion stops at 
        some point otherwise it will cause stackoverflow
3. 

*/

#include <stdio.h>


// Function declaration (Part of global declaration)
int calculator(int a, int b, int operation);
int add(int a, int b);
int power(int a, int b);

int main () {
    int a = 11;
    int b = 2;
    int result = calculator(a, b, 1);

    printf("Simple function cal\n");
    printf("Sum of %d and %d is %d\n", a, b, result);

    printf("Recursive function cal\n");
    printf("%d to the power of %d is %d\n", b, a, power(b, a));

    return 0;
}

int power(int a, int b) {
    int y;
    if (b == 0) {
        return 1;
    }
    y = a * power(a, b - 1);
    return y;
}


int calculator(int a, int b, int operation) {
    if (operation == 1) {
        return add(a, b);
    }
}

int add(int a, int b) {
    return a + b;
}