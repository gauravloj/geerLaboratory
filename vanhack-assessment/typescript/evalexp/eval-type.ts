/**
 * Creating a generic stack class to process expression during evaulation
 */
class Stack<T> {
  // All the pushed items will be stored here
  itemList: Array<T>;

  // Returns the size of current stack
  get size(): number {
    return this.itemList.length;
  }

  constructor() {
    this.itemList = [];
  }

  // push an item to stack
  push(val: T) {
    this.itemList.push(val);
  }

  // remove and return the recently pushed item in stack
  pop(): T | null {
    if (this.size > 0) {
      return <T>this.itemList.pop();
    }
    return null;
  }

  // return the recently pushed item in stack
  peek(): T | null {
    if (this.size > 0) {
      return this.itemList[this.size - 1];
    }
    return null;
  }

  // return the stack array
  toArray(): Array<T> {
    return this.itemList;
  }
}

// define the type for operation mapper
// which maps operator to its function
interface OperatorMapper {
  [operator: string]: (x: number, y: number) => number;
}

// Calculator class that stores all the logic of
// expression evaluation
class Calculator {
  currNum: string;
  private static readonly _operations: OperatorMapper = {
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "/": (a, b) => a / b,
  };

  constructor() {
    this.currNum = "";
  }

  // given the latest read number, push the number if
  // last item is '+' or '-' else perform the respective
  // operation if last item is '*' or '/'
  private static ResolveExpression(
    num: string,
    valStack: Stack<string>
  ): string {
    let operand2: number = Number(num);
    if (valStack.size > 0) {
      let lastItem: string = <string>valStack.peek();
      if (lastItem == "*" || lastItem == "/") {
        let operation: (x: number, y: number) => number;
        operation = Calculator._operations[<string>valStack.pop()];
        let op1: number = Number(valStack.pop());
        operand2 = operation(op1, operand2);
      }
    }

    return operand2.toString();
  }

  // input expression is simple addition and subtraction
  private static EvaluateSimpleExpression(valStack: Stack<string>): number {
    let result: number = 0.0; // stores the result of given expression
    let sign: number = 1; // sign of number to be decided based on the operator
    let exp: Array<string> = valStack.toArray();
    for (var item of exp) {
      let typeItem: string = item;
      if (typeItem == "-") {
        sign = -1;
      } else if (typeItem == "+") {
        sign = 1;
      } else {
        result += sign * Number(typeItem);
      }
    }

    return result;
  }

  public Calculate(expression: string): number {
    let result: number = 0.0;
    let expressionStack: Stack<Stack<string>> = new Stack<Stack<string>>();
    let valueStack: Stack<string> = new Stack<string>();
    var i: number = 0,
      lastItem: string = "";
    expression += ")";
    this.currNum = "";
    while (i < expression.length) {
      let currItem: string = expression[i];

      switch (currItem) {
        case ".":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          /**
           * Insert any numeric value or '.' to current stack
           */

          this.currNum += currItem;
          break;
        case "(":
          /**
           * If an opening bracket is encountered,
           * 1. push the current expression to expression stack
           * 2. insert '-' if there is - before '(' else push '+'
           * 3. initialise current stack with new Stack object
           */
          if (this.currNum.length > 0) {
            valueStack.push("-");
          } else {
            valueStack.push("+");
          }
          this.currNum = "";
          expressionStack.push(valueStack);
          valueStack = new Stack<string>();
          break;
        case ")":
          /**
           * If a closing bracket is encountered,
           * 1. Resolve the current expression ig this.currNum has some value
           * 2. Evaluate the current stack to get its numeric value
           * 3. pop the latest item from expression stack
           * 4. Store the output from step 2 to this.currNum, as
           *    this will be used when any operator is encountered
           */
          if (this.currNum.length > 0) {
            var val = Calculator.ResolveExpression(this.currNum, valueStack);
            valueStack.push(val);
          }
          this.currNum = "";
          result = Calculator.EvaluateSimpleExpression(valueStack);
          if (expressionStack.size > 0) {
            valueStack = <Stack<string>>expressionStack.pop();
            lastItem = <string>valueStack.pop();
            if (lastItem == "-") {
              result = -1 * result;
            }
            this.currNum += result.toString();
          }
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          if (currItem == "-" && this.currNum.length == 0) {
            this.currNum += currItem;
            i += 1;
            continue;
          }
          valueStack.push(
            Calculator.ResolveExpression(this.currNum, valueStack)
          );
          valueStack.push(currItem);
          this.currNum = "";
          break;
        default:
          break;
      }
      i += 1;
    }
    return result;
  }
}

const calculator = new Calculator();
const calc = calculator.Calculate;

export { calc };
