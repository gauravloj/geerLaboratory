#include <stdio.h>

#define NUM_BUCKETS 10000

typedef struct {
    int key;
    int value;
} hashEntry;

typedef struct {
    int size;
    hashEntry* table;
} MyHashMap;

MyHashMap* myHashMapCreate() {
    MyHashMap* obj = (MyHashMap*)malloc(sizeof(MyHashMap));
    obj->size = NUM_BUCKETS;
    obj->table = (hashEntry*)malloc(sizeof(hashEntry) * obj->size);
    for (int i = 0; i < obj->size; i++) {
        obj->table[i].key = -1;
    }
    return obj;
}

void myHashMapPut(MyHashMap* obj, int key, int value) {
    int hash = key % obj->size;
    while (obj->table[hash].key != -1 && obj->table[hash].key != key) {
        hash = (hash + 1) % obj->size;
    }

    obj->table[hash].key = key;
    obj->table[hash].value = value;
}

int myHashMapGet(MyHashMap* obj, int key) {
    int hash = key % obj->size;
    while (obj->table[hash].key != -1) {
        if (obj->table[hash].key == key) {
            return obj->table[hash].value;
        }
        hash = (hash + 1) % obj->size;
    }
    return -1;
}

void myHashMapRemove(MyHashMap* obj, int key) {
    int hash = key % obj->size;
    while (obj->table[hash].key != -1) {
        if (obj->table[hash].key == key) {
            obj->table[hash].key = -2;
            return;
        }
        hash = (hash + 1) % obj->size;
    }
}

void myHashMapFree(MyHashMap* obj) {
    free(obj->table);
    free(obj);
}