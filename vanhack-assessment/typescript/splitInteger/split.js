"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitInteger = void 0;
const splitInteger = (num, parts) => {
  let partVal = Math.trunc(num / parts);
  let resultArr = Array(parts).fill(partVal);
  let partsDone = num - partVal * parts;
  let index = resultArr.length - 1;
  console.log(partsDone);
  while (partsDone > 0) {
    resultArr[index] += 1;
    index -= 1;
    partsDone -= 1;
  }
  return resultArr;
};

console.log(splitInteger(10, 1));
exports.splitInteger = splitInteger;
