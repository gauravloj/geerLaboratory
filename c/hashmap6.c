typedef struct Entry {
    int key;
    int value;
    struct Entry *next;
} Entry;

typedef struct {
    Entry *bucket[1000001];
} MyHashMap;


MyHashMap* myHashMapCreate() {
    MyHashMap *map = malloc(sizeof(MyHashMap));
    for (int i=0; i < 1000001; ++i) {
        map->bucket[i] = NULL;
    }
    return map;
}

void myHashMapPut(MyHashMap* obj, int key, int value) {
    Entry *e;
    if (obj->bucket[key] == NULL) {
        e = malloc(sizeof(Entry));
        e->key = key;
        e->value = value;
        e->next = NULL;
        obj->bucket[key] = e;
    } else {
        e = obj->bucket[key];
        e->value = value;
    }
}

int myHashMapGet(MyHashMap* obj, int key) {
    Entry *e = obj->bucket[key];
    if (e == NULL) {
        return -1;
    } else {
        return e->value;
    }
}

void myHashMapRemove(MyHashMap* obj, int key) {
    Entry *e = obj->bucket[key];
    if (e != NULL) {
        obj->bucket[key] = NULL;
        free(e);
    }
}

void myHashMapFree(MyHashMap* obj) {
    int i;
    for (i = 0; i < 1000001; ++i) {
        if (obj->bucket[i] != NULL) {
            free(obj->bucket[i]);
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