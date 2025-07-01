#define MAX 1000

int hash(int value) {
    return value % MAX;
}

typedef struct LinkedList {
    int key;
    int value;
    struct LinkedList *next; 
} Node;

typedef struct {
    Node **bucket;
} MyHashMap;

MyHashMap* myHashMapCreate() 
{
    MyHashMap *hashMap = (MyHashMap *)malloc(sizeof(MyHashMap));
    hashMap->bucket = (Node **)calloc(MAX, sizeof(Node *)); 
    return hashMap;
}

void myHashMapPut(MyHashMap* obj, int key, int value) 
{
    // FRONT: if hash table is empty at the index, then insert a Node there
    // MIDDLE: if, while iterating, the obj->key == key given, then update Node value
    // END: if the entire list was iterated without the key found, then insert Node at the end
    
    int index = hash(key);
    Node *curr = obj->bucket[index];

    // if this is the first entry
    if (curr == NULL) {
        obj->bucket[index] = (Node *)calloc(1, sizeof(Node));
        curr = obj->bucket[index];
    }
    // otherwise iterate to the proper Node 
    else {
        for (curr; curr->next != NULL && curr->key != key; curr=curr->next) 
            ;
        // if the end was reached create a new node and iterate into it
        if (curr->key != key) {
            curr->next = (Node *)calloc(1, sizeof(Node));
            curr = curr->next;
        }
    }
    curr->key = key;
    curr->value = value;
}

int myHashMapGet(MyHashMap* obj, int key) 
{
    int index = hash(key);
    Node *curr = obj->bucket[index];

    // if the list is empty 
    if (curr == NULL) return -1; 

    // iterate the list until the keys match or end is reached
    for (curr; curr->key != key && curr->next != NULL; curr=curr->next)
        ;
    return (curr->key == key) ? curr->value : -1;
}

void myHashMapRemove(MyHashMap* obj, int key) 
{
    int index = hash(key);
    
    Node *curr, *prev;
    prev = curr = obj->bucket[index];


    // if the list is empty 
    if (curr == NULL) return;

    // check if head of list needs to be removed
    if (curr->key == key) {
        obj->bucket[index] = curr->next;
        free(curr);
        return;
    }

    // else iterate to the proper Node to remove
    curr = curr->next; 
    while (curr != NULL) {
        if (curr->key == key) {
            prev->next = curr->next;
            free(curr);
            return;
        }
        prev = curr;
        curr = curr->next;
    }
}

void myHashMapFree(MyHashMap* obj) 
{
    // iterate through each list and...
    for (int i=0; i < MAX; i++) {
        // if the list is not empty then...
        if (obj->bucket[i] != NULL) {
            // free all memory from the heap
            Node *prev, *curr;
            prev = curr = obj->bucket[i];
            while (curr != NULL) {
                curr=curr->next;
                free(prev);
                prev = curr; 
            }
        }
    }
    free(obj);
}

/**
 * Your MyHashMap struct will be instantiated and called as such:
 * MyHashMap* obj = myHashMapCreate();
 * myHashMapPut(obj, key, value);
 
 * int param_2 = myHashMapGet(obj, key);
 
 * myHashMapRemove(obj, key);
 
 * myHashMapFree(obj);
*/