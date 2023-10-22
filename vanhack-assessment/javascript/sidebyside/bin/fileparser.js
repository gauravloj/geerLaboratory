// A closure to make file object that contains
// file specific parameters
const getFileObject = (function () {
  var maxColumnSize;
  var rowCount;
  var filecontent;
  var fileName;
  var charLength;
  let fptr;
  let isEOF;

  function getFile(name, content, colWidth) {
    rowCount = 0;
    maxColumnSize = 0;
    filecontent = content.replace("\t", "    ");
    fileName = name;
    charLength = filecontent.length;
    fptr = 0;
    isEOF = false;

    let contentLines = filecontent.split("\n");
    contentLines.forEach((line) => {
      rowCount += 1;
      maxColumnSize = Math.max(line.length, maxColumnSize);
    });

    if (colWidth != null) {
      maxColumnSize = colWidth;
    }

    const generateXSpaces = function (x) {
      let line = "";
      while (x > 0) {
        line += " ";
        x -= 1;
      }
      return line;
    };

    return {
      maxColumnSize,
      rowCount,
      filecontent,
      fileName,
      charLength,
      fptr,
      isEOF,
      setFilePointer: function (x) {
        if (x > this.charLength) {
          this.fptr = this.charLength - 1;
          this.isEOF = true;
          return false;
        }
        this.fptr = x;
        this.isEOF = false;
        return true;
      },
      getNextLine: function () {
        let currCharCount = 0;
        let line = "";
        let currChar = null;

        if (this.fptr >= this.charLength) {
          this.isEOF = true;
          line += generateXSpaces(this.maxColumnSize);
          return line;
        }

        while (currCharCount < this.maxColumnSize) {
          currChar = this.filecontent[this.fptr] || " ";
          this.fptr += 1;

          if (currChar === "\n") {
            break;
          }
          if (currChar == "\t") {
            line += "    ";
            currCharCount += 3;
          } else {
            line += currChar;
          }
          currCharCount += 1;
        }
        if (currCharCount < this.maxColumnSize) {
          line += generateXSpaces(this.maxColumnSize - currCharCount);
        } else {
          currChar = this.filecontent[this.fptr] || " ";
          if (currChar === "\n") {
            this.fptr += 1;
          }
        }
        return line;
      },
    };
  }
  return getFile;
})();

module.exports = { getFileObject };
