
#define TABLE_SIZE 10   

struct HashNode{
    int key;
    int value;
    struct HashNode *next;
    struct HashNode *prev;
};

struct MyHashMap
{
    int size;
    struct HashNode **Table;
};

typedef struct MyHashMap MyHashMap;

int hash(struct MyHashMap *ht,int key)
{
    return key%(ht->size);
}

MyHashMap* myHashMapCreate() {
    struct MyHashMap *ht=NULL;
    ht=(struct MyHashMap *)malloc(sizeof(MyHashMap));
    (ht)->size=TABLE_SIZE;
    (ht)->Table=(struct HashNode **)calloc(TABLE_SIZE,sizeof(struct HashNode *));
    for(int iCnt=0;iCnt<(ht->size);iCnt++)
    {
        (ht)->Table[iCnt]=NULL;
    } 
    return ht;
}

void myHashMapPut(struct MyHashMap *ht, int key, int value) {
     int index=hash(ht,key);
     struct HashNode *temp=ht->Table[index];
     while(temp!=NULL)
     {
         if(temp->key==key)
         {
             temp->value=value;
             return;
         }
         
         temp=temp->next;
     }
    
    struct HashNode *newn=(struct HashNode *)malloc(sizeof(struct HashNode));
    newn->key=key;
    newn->value=value;
    newn->next=NULL;
    struct HashNode *first=ht->Table[index];

    if(ht->Table[index]==NULL)
    {
        ht->Table[index]=newn;
    }
    else                        //Insert_First
    {
       newn->next=first;
       ht->Table[index]=newn;
    }
    
}

int myHashMapGet(struct MyHashMap *ht, int key) {
    
    int find=-1;
    int index=hash(ht,key);

    struct HashNode *temp=ht->Table[index];

    while(temp!=NULL)
    {
        if(temp->key==key)
        {
            return temp->value;
        }
        temp=temp->next;
    }

    return -1;
}

void myHashMapRemove(struct MyHashMap *ht, int key) {
    int index=hash(ht,key);

    struct HashNode *first=ht->Table[index];
    struct HashNode *temp=first;

    struct HashNode *hold=NULL;

    while(temp!=NULL)
    {
        if(temp->key==key)
        {
            if(hold==NULL)
            {
                ht->Table[index]=temp->next;
            }
            else
            {
                hold->next=temp->next;
            }
            free(temp);
            return;

        }
        hold=temp;
        temp=temp->next;
    } 
}

void myHashMapFree( struct MyHashMap *ht) {
    for(int i=0;i<TABLE_SIZE;i++)
    {
        free(ht->Table[i]);
    }
    free(ht);
}

/**
 * Your MyHashMap struct will be instantiated and called as such:
 * MyHashMap* obj = myHashMapCreate();
 * myHashMapPut(obj, key, value);
 
 * int param_2 = myHashMapGet(obj, key);
 
 * myHashMapRemove(obj, key);
 
 * myHashMapFree(obj);
*/