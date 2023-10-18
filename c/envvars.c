#include <stdio.h> 
#include <stdlib.h>

// list of all env variables
extern char **environ; // MUST be extern AND named "environ"

int main(void) {
  char *val = getenv("FROTZ"); // Try to get the value

  // Check to make sure it exists
  if (val == NULL) {
    printf("Cannot find the FROTZ environment variable\n");
    return EXIT_FAILURE;
  }
  printf("Address: %p,\tValue: %s\n",&val, val); 

  for (char **p = environ; *p != NULL; p++) {
    printf("%s\n", *p);
  }
  // Or you could do this:
  for (int i = 0; environ[i] != NULL; i++) {
    printf("%s\n", environ[i]);
  }

}
