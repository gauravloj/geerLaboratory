"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calc = void 0;
/**
 * Creating a generic stack class to process expression during evaulation
 */
class Stack {
    constructor() {
        this.itemList = [];
    }
    // Returns the size of current stack
    get size() {
        return this.itemList.length;
    }
    // push an item to stack
    push(val) {
        this.itemList.push(val);
    }
    // remove and return the recently pushed item in stack
    pop() {
        if (this.size > 0) {
            return this.itemList.pop();
        }
        return null;
    }
    // return the recently pushed item in stack
    peek() {
        if (this.size > 0) {
            return this.itemList[this.size - 1];
        }
        return null;
    }
    // return the stack array
    toArray() {
        return this.itemList;
    }
}
// Calculator class that stores all the logic of
// expression evaluation
class Calculator {
    constructor() {
        this.currNum = "";
    }
    // given the latest read number, push the number if
    // last item is '+' or '-' else perform the respective
    // operation if last item is '*' or '/'
    static ResolveExpression(num, valStack) {
        let operand2 = Number(num);
        if (valStack.size > 0) {
            let lastItem = valStack.peek();
            if (lastItem == "*" || lastItem == "/") {
                let operation;
                operation = Calculator._operations[valStack.pop()];
                let op1 = Number(valStack.pop());
                operand2 = operation(op1, operand2);
            }
        }
        return operand2.toString();
    }
    // input expression is simple addition and subtraction
    static EvaluateSimpleExpression(valStack) {
        let result = 0.0; // stores the result of given expression
        let sign = 1; // sign of number to be decided based on the operator
        let exp = valStack.toArray();
        for (var item of exp) {
            let typeItem = item;
            if (typeItem == "-") {
                sign = -1;
            }
            else if (typeItem == "+") {
                sign = 1;
            }
            else {
                result += sign * Number(typeItem);
            }
        }
        return result;
    }
    Calculate(expression) {
        let result = 0.0;
        let expressionStack = new Stack();
        let valueStack = new Stack();
        var i = 0, lastItem = "";
        expression += ")";
        this.currNum = "";
        while (i < expression.length) {
            let currItem = expression[i];
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
                    }
                    else {
                        valueStack.push("+");
                    }
                    this.currNum = "";
                    expressionStack.push(valueStack);
                    valueStack = new Stack();
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
                        valueStack = expressionStack.pop();
                        lastItem = valueStack.pop();
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
                    valueStack.push(Calculator.ResolveExpression(this.currNum, valueStack));
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
Calculator._operations = {
    "*": (a, b) => a * b,
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "/": (a, b) => a / b,
};
const calculator = new Calculator();
const calc = calculator.Calculate;
exports.calc = calc;
