import { calc } from "./eval-type";

let i: number = 33;
let chars: string = "";
let chars2: string[] = [];
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
