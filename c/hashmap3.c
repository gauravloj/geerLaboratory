
#define SIZE 1003

struct hash{
    int key;
    int val;
    struct hash* next;
};
typedef struct {
    struct hash* set[SIZE];

} MyHashMap;
struct hash* creatNode(int key,int val){
    struct hash* newNode=malloc(sizeof(struct hash));
    newNode->key=key;
    newNode->val=val;
    newNode->next=NULL;
    return newNode;
}
MyHashMap* myHashMapCreate() {
    MyHashMap* hashMap = malloc(sizeof(MyHashMap));
    memset(hashMap->set, 0, sizeof(hashMap->set));
    return hashMap;
}

int hash(int key){
    return key%SIZE;
}
void myHashMapPut(MyHashMap* obj, int key, int value) {
    int hash_key=hash(key);
    struct hash* newhead=malloc(sizeof(struct hash));
    newhead->next=obj->set[hash_key];
    struct hash* item=newhead;
    while(item->next){
        if(key==item->next->key){
            item->next->val=value;
            return;
        }

        item=item->next;
    }
    item->next=creatNode(key,value);
    obj->set[hash_key]=newhead->next;
}

int myHashMapGet(MyHashMap* obj, int key) {
    int hash_key=hash(key);
    struct hash* item=obj->set[hash_key];
    while(item){
        if(key==item->key){
            return item->val;
        }
        item=item->next;
    }
    return -1;
}

void myHashMapRemove(MyHashMap* obj, int key) {
    int hash_key=hash(key);

    struct hash* newhead=malloc(sizeof(struct hash));
    newhead->next=obj->set[hash_key];
    struct hash* item=newhead;
    while(item&&item->next){
        if(key==item->next->key){
            item->next=item->next->next;
        }
        item=item->next;
    }
    obj->set[hash_key]=newhead->next;

}
void myHashMapFree(MyHashMap* obj) {
    free(obj->set);

}