"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stack {
    constructor() {
        this.itemList = [];
    }
    get size() {
        return this.itemList.length;
    }
    push(val) {
        this.itemList.push(val);
    }
    pop() {
        if (this.size > 0) {
            return this.itemList.pop();
        }
        return null;
    }
    peek() {
        if (this.size > 0) {
            return this.itemList[this.size - 1];
        }
        return null;
    }
    toArray() {
        return this.itemList;
    }
}
exports.default = Stack;
