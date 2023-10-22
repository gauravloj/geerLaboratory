#include <arpa/inet.h>
#include <ifaddrs.h>
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

void gethostname_self() {
  char host[BUFSIZ];
  int r;

  /* check this machine */
  r = gethostname(host, BUFSIZ);
  if (r == -1) {
    fprintf(stderr, "Unable to obtain host name\n");
    exit(1);
  }

  /* report the host name */
  printf("This host is named '%s'\n", host);
}

void gethostdetails() {
  char host[BUFSIZ];
  int r;
  struct hostent *hostdata;
  char **addresses;

  /* check this machine */
  r = gethostname(host, BUFSIZ);
  if (r == -1) {
    fprintf(stderr, "Unable to obtain host name\n");
    exit(1);
  }

  /* report the host name */
  printf("This host is named '%s'\n", host);

  /* get information about the host */
  hostdata = gethostbyname(host); /* function is obsolete */
  if (hostdata == NULL) {
    fprintf(stderr, "Can't obtain host data\n");
    exit(1);
  }
  printf("Address(es): ");
  addresses = hostdata->h_addr_list;
  while (*addresses) {
    printf("%s\n", inet_ntoa(*(struct in_addr *)*addresses));
    addresses++;
  }
}

void get_ip_info() {
  /* server information */
  const char *google_dns_server = "8.8.8.8";
  const char *dns_port = "53";
  const char *p;
  char buffer[BUFSIZ];
  int sockfd, r;
  struct addrinfo hints, *peer_address;
  struct sockaddr_in name;
  socklen_t namelen;

  /* cnofigure the peer_address addrinfo structure */
  memset(&hints, 0, sizeof(struct addrinfo));
  hints.ai_family = AF_INET;
  hints.ai_socktype = SOCK_DGRAM;
  r = getaddrinfo(google_dns_server, dns_port, &hints, &peer_address);
  if (r != 0) {
    perror("failed");
    exit(1);
  }

  /* connect the socket */
  sockfd = socket(peer_address->ai_family, peer_address->ai_socktype,
                  peer_address->ai_protocol);
  if (sockfd == -1) {
    perror("failed");
    exit(1);
  }

  /* connect to the server */
  r = connect(sockfd, peer_address->ai_addr, peer_address->ai_addrlen);
  if (r == -1) {
    perror("failed");
    exit(1);
  }

  /* obtain the local socket's name/address */
  namelen = sizeof(name);
  r = getsockname(sockfd, (struct sockaddr *)&name, &namelen);
  if (r == -1) {
    perror("failed");
    exit(1);
  }

  /* output the results */
  p = inet_ntop(peer_address->ai_family, &name.sin_addr, buffer, BUFSIZ);
  if (p != NULL) {
    printf("Local IP is: %s\n", buffer);
  } else {
    fprintf(stderr, "Operation failed\n");
  }

  /* done, close the socket */
  close(sockfd);
}

void interfacedetails() {

  struct ifaddrs *adapters, *a;
  int r, addrfam;
  const int ap_size = 100;
  char ap[ap_size];

  puts("This computer's network interfaces:");
  r = getifaddrs(&adapters);
  if (r == -1) {
    perror("Interfaces");
    exit(1);
  }
  printf("%-8s%-8s%s\n", "Name", "Family", "Address");

  /* walk through the linked list */
  a = adapters;
  while (a) {
    addrfam = a->ifa_addr->sa_family;
    if (addrfam == AF_INET || addrfam == AF_INET6) {
      getnameinfo(a->ifa_addr,
                  addrfam == AF_INET ? sizeof(struct sockaddr_in)
                                     : sizeof(struct sockaddr_in6),
                  ap, ap_size, 0, 0, NI_NUMERICHOST);
      printf("%-8s%-8s%s\n", a->ifa_name, addrfam == AF_INET ? "IPv4" : "IPv6",
             ap);
    }
    a = a->ifa_next;
  }

  /* free memory - linked list */
  freeifaddrs(adapters);
}

int main() {
  gethostname_self();
  gethostdetails();
  get_ip_info();

  return (0);
}
