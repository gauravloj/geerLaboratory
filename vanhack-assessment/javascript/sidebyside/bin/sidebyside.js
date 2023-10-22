import { promises } from "fs";
import { getFileObject } from "./fileparser";

let isSize = false,
  isPadding = false;
let padding = 2,
  size = null,
  files = [];

// Processing command line parameters
for (let argv of process.argv.slice(2)) {
  if (argv === "-s") {
    isSize = true;
  } else if (argv === "-c") {
    isPadding = true;
  } else {
    if (isSize) {
      size = parseInt(argv);
      isSize = false;
    } else if (isPadding) {
      padding = parseInt(argv);
      isPadding = false;
    } else {
      files.push(argv);
    }
  }
}

let readPromises = [];
let fileObjects = [];
let paddingString = "";

// padding string between each column
for (let i = 0; i < padding; i++) {
  paddingString += " ";
}

// Read each file asynchronously
files.forEach((file) => {
  readPromises.push(promises.readFile(file));
});

// Processing each file once all the files are
// done reading
Promise.all(readPromises).then((contents) => {
  contents.forEach((content, index) => {
    let currObj = getFileObject(files[index], content.toString(), size);
    fileObjects.push(currObj);
  });

  let isAllFilesRead = false;
  while (!isAllFilesRead) {
    isAllFilesRead = true;
    let currLine = "";
    fileObjects.forEach((obj, idx) => {
      currLine += obj.getNextLine();
      if (idx < fileObjects.length - 1) {
        currLine += paddingString;
      }
      isAllFilesRead = isAllFilesRead && obj.isEOF;
    });
    if (!isAllFilesRead) {
      console.log(currLine);
    }
  }
});
