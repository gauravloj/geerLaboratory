#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>

void uselessExample() {

  int pfds[2];
  int pfds2[2];
  char buf[30];
  if (pipe(pfds) == -1) {
    perror("pipe");
    exit(1);
  }

  // if (pipe(pfds2) == -1) {
  // perror("pipe");
  // exit(1);
  // }

  printf("writing to file descriptor #%d\n", pfds[1]);
  write(pfds[1], "test", 5);
  printf("reading from file descriptor #%d\n", pfds[0]);
  read(pfds[0], buf, 5);
  printf("read \"%s\"\n", buf);

  if (pipe(pfds2) == -1) {
    perror("pipe");
    exit(1);
  }

  printf("writing to file descriptor #%d\n", pfds2[1]);
  write(pfds2[1], "test", 5);
  printf("reading from file descriptor #%d\n", pfds2[0]);
  read(pfds2[0], buf, 5);
  printf("read \"%s\"\n", buf);
}

void forkAndPipe() {
  int pfds[2];
  char buf[30];
  pipe(pfds);
  if (!fork()) {
    printf(" CHILD: writing to the pipe\n");
    write(pfds[1], "test", 5);
    printf(" CHILD: exiting\n");
    exit(0);
  } else {
    printf("PARENT: reading from pipe\n");
    read(pfds[0], buf, 5);
    printf("PARENT: read \"%s\"\n", buf);
    wait(NULL);
  }
}

void bashPipeSample() {
  int pfds[2];
  pipe(pfds);
  if (!fork()) {
    /* close normal stdout */
    /* make stdout same as pfds[1] */
    close(1);
    dup(pfds[1]);
    close(pfds[0]); /* we don't need this */
    execlp("ls", "ls", NULL);
  } else {
    close(0);       /* close normal stdin */
    dup(pfds[0]);   /* make stdin same as pfds[0] */
    close(pfds[1]); /* we don't need this */
    execlp("wc", "wc", "-l", NULL);
  }
}

int main(void) { bashPipeSample(); }

