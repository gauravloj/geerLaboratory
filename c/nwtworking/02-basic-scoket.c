#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

void getaddr_ex() {
  /* server information */
  const char *host = "yahoo.com";
  const char *port = "80";
  int r;
  struct addrinfo hints, *resource;

  /* prep the hints structure */
  printf("Configuring host...");
  memset(&hints, 0, sizeof(struct addrinfo)); /* use memset_s() */
  hints.ai_family = AF_INET;                  /* IPv4 */
  hints.ai_socktype = SOCK_STREAM;            /* TCP */
  /* fill the resource structure */
  r = getaddrinfo(host, port, &hints, &resource);
  if (r != 0) {
    perror("Failed");
    exit(1);
  }
  puts("done");

  /* free allocated memory */
  freeaddrinfo(resource);
}

int socket_simple() {
  int sockfd;

  /* create the socket */
  printf("Assign a socket...");
  sockfd = socket(AF_INET, SOCK_STREAM, 0);
  if (sockfd == -1) {
    perror("failed");
    exit(1);
  }
  puts("done");

  /* close the socket */
  close(sockfd);
  puts("Socket closed, done");
  return (0);
}

int socket_recommended() {
  struct addrinfo hints, *server;
  int r, sockfd;

  /* configure the host */
  printf("Configuring host...");
  memset(&hints, 0, sizeof(struct addrinfo)); /* use memset_s() */
  hints.ai_family = AF_INET;                  /* IPv4 connection */
  hints.ai_socktype = SOCK_STREAM;            /* TCP, streaming */
  /* connection with localhost (zero) on port 8080 */
  r = getaddrinfo(0, "8080", &hints, &server);
  if (r != 0) {
    perror("failed");
    exit(1);
  }
  puts("done");

  /* create the socket */
  printf("Assign a socket...");
  sockfd = socket(server->ai_family,   /* domain, TCP here */
                  server->ai_socktype, /* type, stream */
                  server->ai_protocol  /* protocol, IP */
  );
  if (sockfd == -1) {
    perror("failed");
    exit(1);
  }
  puts("done");

  /* free allocated memory */
  freeaddrinfo(server);
  /* close the socket */
  close(sockfd);
  puts("Socket closed, done");
  return (0);
}

int main() {
  getaddr_ex();
  return (0);
}
