
#include <stdio.h>
#include <stdlib.h>



int main () {
    int n = 7, i, *ptr, sum = 0;

    ptr = (int*) malloc(n * sizeof(int));
    // ptr = (int*) calloc(n, sizeof(int));
    if (ptr == NULL) {
        printf("Unable to allocate memory");
        EXIT_FAILURE;
    }

    for (i = 0; i < n; i++) {
        *(ptr + i) = i + 23;
        printf("%d, ", *(ptr + i));
        sum += *(ptr + i);
    }

    printf("\n Total sum : %d\n", sum);
    free(ptr);
    return 0;

}

