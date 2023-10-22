"use strict";
class ByteParser {
    static StringToByteArray(inStr) {
        let byteArr = new Array();
        for (let chr of inStr) {
            byteArr.push(chr.charCodeAt(0));
        }
        return byteArr;
    }
    static BytesToWords(inputData) {
        let wordArr = [];
        let wordStr = "";
        let wordCount = 4;
        for (let byte of inputData) {
            let binRepr = Number(byte).toString(2);
            let binLen = binRepr.length;
            while (binLen < 8) {
                binRepr = "0" + binRepr;
                binLen += 1;
            }
            wordStr += binRepr;
            wordCount -= 1;
            if (wordCount == 0) {
                wordArr.push(parseInt(wordStr, 2));
                wordCount = 4;
                wordStr = "";
            }
        }
        return wordArr;
    }
    static WordToBytes(inputData) {
        let wordArr = [];
        let byteCount = 4;
        while (byteCount > 0) {
            let currByte = inputData & 0xFF;
            wordArr.unshift(String.fromCharCode(currByte));
            inputData = inputData >> 8;
            byteCount -= 1;
        }
        return wordArr.join('');
    }
}
String.prototype.toAscii85 = function () {
    const prefixStr = "<~";
    const suffixStr = "~>";
    // Convert to bytes
    let data = ByteParser.StringToByteArray(this.valueOf());
    // Preparing ASCII85 characters
    const powers_of_85 = [85, 85 * 85, 85 * 85 * 85];
    let i = 33;
    let chars = "";
    let chars2 = [];
    while (i < 118) {
        chars += String.fromCharCode(i);
        i += 1;
    }
    for (let iChar of chars) {
        for (let jChar of chars) {
            chars2.push(iChar + jChar);
        }
    }
    // Add paddings of not a multiple of 4 bytes
    let padding = -data.length & 3;
    i = 0;
    while (i < padding) {
        data.push(0); // adding null '\0' character as padding
        i += 1;
    }
    // divide data into a group of 4 bytes
    let words = ByteParser.BytesToWords(data);
    let chunks = [];
    for (let word of words) {
        let curr_chunk = "";
        if (word == 0) {
            curr_chunk = "z";
        }
        else {
            curr_chunk =
                chars2[Math.trunc(word / powers_of_85[2])] +
                    chars2[Math.trunc(word / powers_of_85[0]) % powers_of_85[1]] +
                    chars[word % powers_of_85[0]];
        }
        chunks.push(curr_chunk);
    }
    // Remove extra paddings added in the string
    if (padding > 0) {
        let lastChar = chunks[chunks.length - 1];
        if (lastChar == "z") {
            lastChar = chars[0].repeat(5);
        }
        chunks[chunks.length - 1] = lastChar.slice(0, -padding);
    }
    // Adding Pre-defined prefix and suffix
    let result = prefixStr + chunks.join("") + suffixStr;
    return result;
};
String.prototype.fromAscii85 = function () {
    // decode this string from ASCII85
    const prefixStr = "<~";
    const suffixStr = "~>";
    let data = this;
    //  Remove prefix and suffix used during encoding and
    //  adding a 4 character padding to ensure last chunk of data
    //  is parsed properly
    data = data.slice(2, -2) + String.fromCharCode(117).repeat(4);
    //   parser = byteParser('!I')
    let decoded = [], curr = [];
    for (let cur_char of data) {
        if (33 <= cur_char.charCodeAt(0) && cur_char.charCodeAt(0) <= 117) {
            curr.push(cur_char);
            if (curr.length == 5) {
                let accumulator = 0;
                for (let c_char of curr) {
                    accumulator = 85 * accumulator + (c_char.charCodeAt(0) - 33);
                }
                decoded.push(ByteParser.WordToBytes(accumulator));
                curr = [];
            }
        }
        else if (cur_char == "z") {
            decoded.push("\0".repeat(4));
        }
        else {
            console.log("ignoring Whitespace or non-ascii character");
        }
    }
    let result = decoded.join('');
    let padding = 4 - curr.length;
    if (padding > 0) {
        //   Throw away the extra padding
        result = result.slice(0, -padding);
    }
    return result;
};
