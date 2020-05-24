#include <stdio.h>


#define MACROCHECK 100

// defined operator : 
#if !defined(MACROCHECK)
#define MACROCHECK 100
#endif

void beforeStartup();
void afterExit();

#pragma startup beforeStartup
#pragma exit afterExit




int main () {

    // Predefined macro
    printf("Filename of current file is : %s\n", __FILE__);

    #ifdef MACROCHECK
        printf("Macro 'MACROCHECK' is defined with value : %s\n", MACROCHECK);
    #else
        printf("Macro 'MACROCHECK' is not defined\n");
    #endif

    #ifndef NOMACROCHECK
        printf("Macro 'MACROCHECK' is not defined\n");
        // This is parameterized macro. No space is allowed between macroname and brackets
        #define MULTI_LINE_MACRO(a,b) \
            printf("Multiline macro is defined using " #a " and " #b );     // #a and #b are printed using stringize operator
    #else
        printf("Macro 'MACROCHECK' is defined\n");
    #endif

    printf("Multiline macro call :\n", MULTI_LINE_MACRO(3, 5));


}


void beforeStartup() {
    printf("This will be printed before starting main function");
}
void afterExit() {
    printf("This will be printed after main function exits");
}

