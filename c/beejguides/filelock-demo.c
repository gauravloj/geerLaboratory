#include <errno.h>
#include <fcntl.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

// struct flock fl;
// int fd;
// fl.l_type   = F_WRLCK;  /* F_RDLCK, F_WRLCK, F_UNLCK    */
// fl.l_whence = SEEK_SET; /* SEEK_SET, SEEK_CUR, SEEK_END */
// fl.l_start  = 0;        /* Offset from l_whence         */
// fl.l_len    = 0;        /* length, 0 = to EOF           */
// fl.l_pid    = getpid(); /* our PID                      */
// fd = open("filename", O_WRONLY);
// fcntl(fd, F_SETLKW, &fl);  /* F_GETLK, F_SETLK, F_SETLKW */

int main(int argc, char *argv[]) {
  /* l_type   l_whence  l_start  l_len  l_pid   */
  struct flock fl = {F_WRLCK, SEEK_SET, 0, 0, 0};
  int fd;

  (void)argv; // silence unused warning

  fl.l_pid = getpid();

  if (argc > 1)
    fl.l_type = F_RDLCK;

  if ((fd = open("lockdemo.c", O_RDWR)) == -1) {
    perror("open");
    exit(1);
  }

  printf("Press <RETURN> to try to get lock: ");
  getchar();
  printf("Trying to get lock...");

  if (fcntl(fd, F_SETLKW, &fl) == -1) {
    perror("fcntl");
    exit(1);
  }

  printf("got lock\n");
  printf("Press <RETURN> to release lock: ");
  getchar();

  fl.l_type = F_UNLCK; /* set to unlock same region */

  if (fcntl(fd, F_SETLK, &fl) == -1) {
    perror("fcntl");
    exit(1);
  }

  printf("Unlocked.\n");

  close(fd);

  return 0;
}
