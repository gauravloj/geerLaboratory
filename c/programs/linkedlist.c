
#include <stdio.h>
#include <stdlib.h>

typedef struct node
{
    int data;
    struct node *next;
}nod;


void addNode(nod **root, int val);
void print(nod *root);
void deleteNode(nod **root, int val);

int main () {
    nod *root = NULL;
    int i;

    for (i = 0; i < 10; i++) {
        addNode(&root, i + 37);
    }

    print(root);

    return 0;

}

void addNode(nod **root, int val) {
    nod *temp = (nod*) malloc(sizeof(nod));
    temp->data = val;
    temp->next = NULL;

    if (*root ==  NULL) {
        *root = temp;
        return;
    }

    nod *list = *root;

    while (list->next != NULL) {
        list = list-> next;
    }
    list->next = temp;
}
void print(nod *root) {
    nod *list = root;

    while (list->next != NULL) {
        printf("%d, ", list->data);
        list = list-> next;
    }
    printf("\n");

}

void deleteNode(nod **root, int val) {
    nod *list = root;
    nod *prev = NULL;

    while (list->next != NULL && list->data != val) {
        prev = temp;
        list = list-> next;
    }
    if (prev == NULL) {
        return;
    }
    if (list->data != val) {
        return;
    }

    prev->next = list->next;
    free(list);
}
