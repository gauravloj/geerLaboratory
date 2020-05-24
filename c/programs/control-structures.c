/*

1. Decision control strucure : Execution of statement based on certain condition. refer '/images/if-control-structure.png'
    - if 
    - if-else
    - Nested if-else
    - conditional operator
2. Loop control : Execution of statement in a loop, Refer 'images/loop-control-structure.png'
    - for loop
    - while loop
    - do while loop
3. Case control : Execution of one statement out of many based on matching condition
    - Switch : statement matching the condition with case condition, will be executed
    - Syntax : 
        switch(condition ) {
            case "case condition1": statements
                break;
            case "case condition2": statements
                break;
            case "case condition3": statements
                break;
            case "case condition4": statements
                break;
            default: statements
                break;
            }

'break' keyword: break is used to exit a loop or switch statement if the loop is no longer required or to avoide 
                executing further cases in switch statements
'continue' keyword: continue is used to stop executing current iteration of a loop and jump to next iteration without executing statements 
                    that comes after the continue statement
'goto' keyword : It is used to jump to a specified label in code. Sample usage :
    statements;
    ...
    label1:              // syntaxt is any name followed by colon ':'
    statements;
    ...
    goto label1         // This will move the control to next statement where 'label1' is defined

    statement;   // this line won't be executed unless above goto statement is skipped using an if statement

*/

#include <stdio.h>

int main () {
    int a = 0;
    printf("Enter a number : ");
    scanf("%d", &a);

    printf("\n\nif-else example:\n");
    // Check if number is positive
    if (a > 0 ) {
        printf("%d is a positive number\n", a);
    } else {
        printf("%d is negative number\n", a);
    }

    // Check if number is even or odd
    if ((a%2) == 0 ) {
        printf("%d is a even number\n", a);
    } else {
        printf("%d is odd number\n", a);
    }

    // Check if number is greater than 0 or divisible by 2
    // Check if number is even or odd
    printf("\n\nNested if-else example:\n");
    if (a > 0 ) {
        printf("%d is greater than 0\n", a);
    } else if ((a%2) == 0 ) {
        printf("%d is less than 0 a even number\n", a);
    } else {
        printf("%d is less than 0 and odd number\n", a);
    }

    // Conditional operator
    printf("\n\nConditional Operator example:\n");
    ((a%2) == 0)? printf("%d is a even number\n", a): printf("%d is odd number\n", a);


    // For loop 
    // Syntax : for (initialization ; condition; loop variable change) {body}
    printf("\n\nFor loop example:\n");
    for (a = 3; a < 9; a++){
        printf("%d, ", a);
    }

    // While loop 
    // Syntax : while ( condition) {body}
    printf("\n\nwhile loop example:\n");
    a = 7;
    while (a < 13 ){
        printf("%d, ", a);
        a++;
    }

    // do loop 
    // Syntax : do {body} while ( condition);
    printf("\n\n do while loop example:\n");
    a = 27;
    do {
        printf("%d, ", a);
        a++;
    } while (a < 33 );


    // Case structure
    printf("Enter a number : ");
    scanf("%d", &a);
    switch (a) {
        case 2: 
            printf("%d is even prime number\n", a);
            break;
        case 4: 
            printf("%d is even but not prime number\n", a);
            break;
        case 6:
            printf("%d is multiple of 2 and 3\n", a);
            //  break;                 //  If the input is 6, then the output is '6 is multiple of 2 and 3 \n 6 is normal number'
        default:
            printf("%d is normal number\n", a);
    }

    return 0;
}