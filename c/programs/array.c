/*
- Array is used to store list of similar data
- Declaration Syntax : <data type> <variable name> [size of array]. Eg. int ages [10]
- Array is built-in data structure
- It stores same type of data
- It stores data in continuous memory locations
- Array index starts with 0 and last index is 'total_size - 1'
- Array element is accesed using index. Eg. 3rd element is a[2]
- Array doesn't have and bound checking. Hence if array 'array_var' is defined for size 5, 
    then accessing array_var[7] won't raise any error. 
- Passing array to a function
    - pass by value : single value is passed
    - pass by reference : whole array is passed in the function. Array values can be modified in the called function

*/

#include <stdio.h>


void passByVal(int a);
void passByRef(int *a, int size);

int main () {
    // Inline Array initialization
    int a[10] = {1, 2, 3, 4, 6, 7, 8, 9, 10, 13};
    int b[] = {1, 2, 3, 4, 6, 7, 8, 9, 10, 13};

    // Multi-dimensional array
    // element can be accessed in similar approach. Eg. d[3][4] will return 5th element in 4th row
    int d[5][5];

    // Dynamic initialization
    int c[10];
    int i;
    for (i = 0; i < 10; i++) {
        c[i] = i + 20;
    }

    // Accessing elements
    // Printing in reverse order
    for (i = 9; i >= 0; i--) {
        printf("%d, ", c[i]);
    }
    printf('\n')

    // passing array as parameter
    passByRef(a);
    passByVal(a[7]);

}


void passByVal(int a) {
    printf('Value passed is %d\n', a);
}
void passByRef(int *a, int size){
    printf('5th Value of the array passed is %d\n', *(a + 4));
}
