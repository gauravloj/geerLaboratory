export const splitInteger = (num: number, parts: number) => {
    // Calculating the value for each part
    let partVal: number = Math.trunc(num / parts);

    // Filling above value to each index in the result array
    let resultArr: Array<number> = Array(parts).fill(partVal);

    // calculating the remainder to distribute over the array
    let remainder: number = num - partVal * parts;
    let index: number = resultArr.length - 1;

    // distribute the remainder to the array item
    // starting from last index
    while (remainder > 0) {
        resultArr[index] += 1;
        index -= 1;
        remainder -= 1;
    }

    return resultArr;
};