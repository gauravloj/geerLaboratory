/*
Structures
- Structure is User defined data type
- It is Collection of different types of data to store records
- Each data member will be allocated individual memory
- Syntax : Below syntaxt will create a structure with name 'struct_name' and three attributes 
    struct struct_name {
        data_type var1;
        data_type2 var2;
        data_type var3;
    };
- Declaration syntax: variable for user defined structure can be declared similar to other declaration
- To declare variable of 'struct_name', 
    - struct struct_name var_name; (similar to : int varname;)

Unions
- Structure is User defined data type similar to structures
- It is datatype to store different data values in single variable
- Unlike structure, memory for union type will be the largest memory occupied by any of it's member.
- Hence union allocates common memory for all its members
- In union, only one member can be accessed at a time
- Syntax : Below syntaxt will create a structure with name 'struct_name' and three attributes 
    union union_name {
        data_type var1;
        data_type2 var2;
        data_type var3;
    };
- Memory allocated to union_name is maxsize of data_type and data_type2
- Declaration syntax: variable for user defined structure can be declared similar to other declaration
- To declare variable of 'union_name', 
    - union struct_name var_name; (similar to : int varname;)

Refer 'images/structure-vs-union.png' for comparison

*/

#include <stdio.h>
#include <string.h>

struct student {
    int marks;
    char name[20];
    float average;
};

// Passing struct to a function
void printStruct(struct student rolone);

int main () {
    // Struct declaration normal
    struct student abel;
    // Struct declaration pointer
    struct student *leb;

    // Initializing normal variable
    strcpy(abel.name, "Bella");
    abel.marks = 100;
    abel.average = 66.6;
    // Initializing pointer variable
    leb = &abel;


    // Accessing normal variable
    printf("Normal record: \n");
    printf("Name : %s\nmarks: %d\nAverage: %f\n", abel.name, abel.marks, abel.average);
    
    // Accessing normal variable
    printf("Pointer record: \n");
    printf("Name : %s\nmarks: %d\nAverage: %f\n", leb->name, leb->marks, leb->average);

    // Passing structure as parameter
    printStruct(abel);

    return 0;
}


void printStruct(struct student rolone) {
    printf("Structure passed as parameter: \n");
    printf("Name : %s\nmarks: %d\nAverage: %f\n", rolone.name, rolone.marks, rolone.average);

}