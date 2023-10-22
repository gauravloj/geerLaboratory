export default class Stack<T> {
  itemList: Array<T>;
  get size(): number {
    return this.itemList.length;
  }
  constructor() {
    this.itemList = [];
  }

  push(val: T) {
    this.itemList.push(val);
  }

  pop(): T | null {
    if (this.size > 0) {
      return <T>this.itemList.pop();
    }
    return null;
  }

  peek(): T | null {
    if (this.size > 0) {
      return this.itemList[this.size - 1];
    }
    return null;
  }

  toArray(): Array<T> {
    return this.itemList;
  }
}
