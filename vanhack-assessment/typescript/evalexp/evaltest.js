"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i = 33;
let chars = "";
let chars2 = [];
while (i < 119) {
    chars += String.fromCharCode(i);
    i += 1;
}
for (let iChar of chars) {
    for (let jChar of chars) {
        chars2.push(iChar + jChar);
    }
}
console.log(chars);
