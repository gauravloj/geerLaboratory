#include <stdlib.h>


#define BUCKETS 10000
#define NO_MAPPING -1

// struct for storing key-value pairs in a chain
struct Item
{
    int key;
    int value;
    struct Item* next;
};

// creates and returns a new initialized item
struct Item*
new_item(int key, int value)
{
    struct Item* new = malloc(sizeof(struct Item));
    if (new == NULL) {
        abort();
    }
    new->key = key;
    new->value = value;
    new->next = NULL;
    return new;
}


// hashmap struct stores the item chains in an array of length BUCKETS
typedef struct
{ 
    struct Item** array;
} MyHashMap;


MyHashMap* 
myHashMapCreate() 
{
    MyHashMap* map = malloc(sizeof(MyHashMap));
    if (map == NULL) {
        abort();
    }
    struct Item** array = malloc(BUCKETS * sizeof(struct Item*));
    if (array == NULL) {
        abort();
    }
    for (int i = 0; i < BUCKETS; i++) {
        array[i] = NULL;
    }
    map->array = array;
    return map;
}


void
myHashMapPut(MyHashMap* obj, int key, int value)
{
    // get tha hash index
    int index = key % BUCKETS;

    // get root node of item chain 
    struct Item* item = obj->array[index];

    if (item == NULL) {
        // item not found, create and assign new item
        obj->array[index] = new_item(key, value);
        return;
    }

    while (item->key != key)
    {
        if (item->next == NULL) {
            // item not found, create and assign new item
            item->next = new_item(key, value);
            return;
        }
        item = item->next;
    }

    // item found, update value of item
    item->value = value;
    return;
}

int
myHashMapGet(MyHashMap* obj, int key) 
{
    // get tha hash index
    int index = key % BUCKETS;

    // get root node of item chain
    struct Item* item = obj->array[index];

    while (item != NULL) 
    {
        if (item->key == key) {
            // item found, return its value
            return item->value;
        }
        item = item->next;
    }
    // item not found
    return NO_MAPPING;
}

void
myHashMapRemove(MyHashMap* obj, int key) 
{
    // get tha hash index
    int index = key % BUCKETS;

    // get root node of item chain
    struct Item* item = obj->array[index];

    if (item == NULL) {
        // item not found
        return;
    }
    if (item->key == key) {
        // item found as root of item chain, remove and replace with next item
        obj->array[index] = item->next;
        free(item);
        return;
    }
    while (item->next != NULL) 
    {
        if (item->next->key == key) {
            // item found in item chain, remove and replace with next item
            struct Item* tmp = item->next;
            item->next = item->next->next;
            free(tmp);
            return;
        }
        item = item->next;
    }
    // item not found
    return;
}


// frees hashmap and items
void
myHashMapFree(MyHashMap* obj)
{
    // free all items
    for (int i = 0; i < BUCKETS; i++) 
    {
        // free item chain at index i
        struct Item* item = obj->array[i];
        while (item != NULL) 
        {
            struct Item* tmp = item;
            item = item->next;
            free(tmp);
        }
    }

    // free array
    free(obj->array);

    // free hashmap
    free(obj);

    return;
}

/**
 * Your MyHashMap struct will be instantiated and called as such:
 * MyHashMap* obj = myHashMapCreate();
 * myHashMapPut(obj, key, value);
 
 * int param_2 = myHashMapGet(obj, key);
 
 * myHashMapRemove(obj, key);
 
 * myHashMapFree(obj);
*/