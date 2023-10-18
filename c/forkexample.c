#include <stdio.h>
#include <stdlib.h>
// #include <errno.h>
#include <unistd.h>
// #include <sys/types.h>
// #include <sys/wait.h>

int main(void)
{
  pid_t pid;
  int rv ;
  pid = fork();
  /* switch(pid) {
    case -1:
      perror("fork");  /* something went wrong *
      exit(1);         /* parent exits *
    case 0:
      printf(" CHILD: This is the child process!\n");
      printf(" CHILD: My PID is %d\n", getpid());
      printf(" CHILD: My parent's PID is %d\n", getppid());
      printf(" CHILD: Enter my exit status (make it small): ");
      scanf(" %d", &rv);
      printf(" CHILD: I'm outta here!\n");
      exit(rv);
    default:
      printf("PARENT: This is the parent process!\n");
      printf("PARENT: My PID is %d\n", getpid());
      printf("PARENT: My child's PID is %d\n", pid);
      printf("PARENT: I'm now waiting for my child to exit()...\n");
      wait(&rv);
      printf("PARENT: My child's exit status is: %d\n", WEXITSTATUS(rv));
      printf("PARENT: I'm outta here!\n");
  } */

  printf("\n\nbefore sleep %s: my PID is %d,\tmy PPID is %d,\tPID val is %d\n\n", (pid == 0)? "CHILD":"PARENT", getpid(), getppid(), pid);
  if (pid == 0){
    printf("printing from child");
    //sleep(1);
  } else {
    printf("printing from parent");
  }
  printf("\n\nafter sleep %s: my PID is %d,\tmy PPID is %d,\tPID val is %d\n\n", (pid == 0)? "CHILD":"PARENT", getpid(), getppid(), pid);

  if (pid == 0){
    rv = 3;
    exit(rv);
  } else {
    printf("Parent nothing\n");
    // exit(rv);
    wait(&rv);
  }
  printf("\n\nafter exit: my PID is %d,\tmy PPID is %d,\tPID val is %d\n\n", getpid(), getppid(), pid);


  printf("this is also common: %d\n", WEXITSTATUS(rv));
  return 0; 
}
