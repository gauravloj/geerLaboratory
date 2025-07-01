#include <stdio.h>

void func1(int a, int b, int c, int d){
        printf("%x, %x, %x, %x\n", a, b, c, d);
}


void func2() {
        int a;
        int b;
        int c;
        int d;
        printf("%x, %x, %x, %x\n", a, b, c, d);
}

void func3(int a) {
        printf("%c, %c, %c, %c\n", *((char *)&a),*((char *)&a+1),*((char *)&a+2),*((char *)&a+3) );
}


void func4() {
        char a, b, c, d;
        printf("%c, %c, %c, %c\n", a, b, c, d);
}

int main(){
        func1(0xdeadbeef, 0xbabecafe, 0x1337, 0xc0ffee);
        func2();
        func3(0x48527273);
        func4();
}