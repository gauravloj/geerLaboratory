using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;

namespace IntOperations
{
    class Challenge
    {
        private static readonly Dictionary<string, Func<double, double, double>> Operations;

        static Challenge()
        {

            Operations = new Dictionary<string, Func<double, double, double>>
            {
                { "*", (a, b) => { return a * b; } },
                { "+", (a, b) => { return a + b; } },
                { "-", (a, b) => { return a - b; } },
                { "/", (a, b) => { return a / b; } }
            };
        }

        private static string ResolveExpression(string currNum, Stack valueStack)
        {
            var operand2 = double.Parse(currNum);
            if (valueStack.Count > 0)
            {
                var lastItem = (string)valueStack.Peek();
                if (lastItem == "*" || lastItem == "/")
                {
                    Func<double, double, double> operation;
                    Operations.TryGetValue((string)valueStack.Pop(), out operation);
                    double op1 = double.Parse((string)valueStack.Pop());
                    operand2 = operation(op1, operand2);
                }
            }

            return operand2.ToString();
        }

        private static double EvaluateSimpleExpression(Stack valueStack)
        {
            double result = 0.0;
            int sign = 1;
            List<object> exp = new List<object>(valueStack.ToArray());
            exp.Reverse();
            foreach (var item in exp)
            {
                string typeItem = (string)item;
                if (typeItem == "-")
                {
                    sign = -1;
                }
                else if (typeItem == "+")
                {
                    sign = 1;
                }
                else
                {
                    result += sign * double.Parse(typeItem);
                }
            }

            return result;
        }

        public static double Calc(string expression)
        {
            Stack expressionStack = new Stack();
            Stack valueStack = new Stack();
            int i = 0, sign = 1;
            double result = 0.0;
            string lastItem = string.Empty;

            expression += ")";
            StringBuilder currNum = new StringBuilder("");
            int strLen = expression.Length;

            while (i < strLen)
            {
                char currItem = expression[i];
                switch (currItem)
                {

                    case '.':
                    case char j when j >= '0' && j <= '9' :
                        currNum.Append(currItem);
                        break;
                    case '(':
                        if (currNum.Length > 0)
                        {
                            valueStack.Push("-");
                        }
                        else
                        {
                            valueStack.Push("+");
                        }
                        currNum.Clear();
                        expressionStack.Push(valueStack);
                        valueStack = new Stack();
                        break;
                    case ')':
                        if (currNum.Length > 0)
                        {
                            var val = ResolveExpression(currNum.ToString(), valueStack);
                            valueStack.Push(val);
                        }
                        currNum.Clear();


                        result = EvaluateSimpleExpression(valueStack);

                        if (expressionStack.Count > 0)
                        {
                            valueStack = (Stack)expressionStack.Pop();
                            lastItem = (string)valueStack.Pop();
                            if (lastItem == "-")
                            {
                                result = -1 * result;
                            }
                            currNum.Append(result.ToString());
                        }

                        break;
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        if (currItem == '-' && currNum.Length == 0)
                        {
                            currNum.Append(currItem);
                            i += 1;
                            continue;
                        }
                        valueStack.Push(ResolveExpression(currNum.ToString(), valueStack));
                        valueStack.Push(currItem.ToString());
                        currNum.Clear();
                        break;
                    default:
                        break;
                }
                i += 1;
            }

            return result;
        }

    }
}