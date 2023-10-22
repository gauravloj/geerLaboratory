class Thing {
  constructor(name) {
    this.name = name;
    this.callstack = [];
    this.lastResult = [];
    this.isList = {};

    const proxy = new Proxy(this, {
      get: function (target, prop, receiver) {
        // console.log("target: ", target, " | prop: ", prop, " | rec:", receiver);

        // updating callstack for is_a method
        if (
          target.callstack.length > 0 &&
          target.callstack[target.callstack.length - 1] == "is_a"
        ) {
          target.isList["is_a_" + prop] = true;
          target.isList[prop + "?"] = true;
          target.clear();
          return true;
        }

        // updating callstack for is_not_a method
        if (
          target.callstack.length > 0 &&
          target.callstack[target.callstack.length - 1] == "is_not_a"
        ) {
          target.isList["is_a_" + prop] = false;
          target.isList[prop + "?"] = false;
          target.clear();
          return true;
        }

        // updating callstack for is_not_a method
        if (
          target.callstack.length > 0 &&
          target.callstack[target.callstack.length - 1] == "can"
        ) {
          target.clear();

          return function () {
            if (arguments.length > 1) {
              let callfunction = arguments[1]
                .toString()
                .replace("${name}", target.name);
              let bucket = arguments[0];
              target[bucket] = [];
              target[prop] = new Proxy(
                new Function("return " + callfunction)(),
                {
                  apply: function (targetFun, that, args) {
                    let res = targetFun(...args);
                    that[bucket].push(res);
                    return res;
                  },
                }
              );
            } else {
              let callfunction = arguments[0]
                .toString()
                .replace("${name}", target.name);
              target[prop] = new Function("return " + callfunction)();
            }
            return true;
          };
        }

        // updating callstack for is_not_a method
        if (
          target.callstack.length > 0 &&
          target.callstack[target.callstack.length - 1] == "is_the"
        ) {
          if (target.lastResult.length > 0) {
            target[target.lastResult[target.lastResult.length - 1]] = prop;
            target.clear();
          } else {
            target.lastResult.push(prop);
          }
          return proxy;
        }

        // updating callstack for has method
        if (
          target.callstack.length > 0 &&
          target.callstack[target.callstack.length - 1] == "has"
        ) {
          let itemCount = target.lastResult.pop();
          target.clear();

          if (itemCount == 1) {
            target[prop] = new Thing(prop);
            return target[prop];
          }
          if (itemCount > 1) {
            Object.prototype.each = function (callback) {
              let newFunc = callback.toString().split("=>");
              let params = newFunc[0].trim().replace(/[()]*/g, "");
              newFunc = params + "." + newFunc[1].trim();
              let funString = `return (${params}) => ${newFunc}`;
              callback = new Function(funString)();

              target[prop].forEach((el) => {
                callback(el);
              });
              target.clear();
            };
            target[prop] = [];
            let j = 0;
            while (j < itemCount) {
              target[prop].push(new Thing(prop.slice(0, -1)));
              j += 1;
            }
          }

          return target;
        }

        // updating callstack for has method
        if (
          target.callstack.length > 0 &&
          target.callstack[target.callstack.length - 1] == "being_the"
        ) {
          if (target.callstack.length > 1) {
            let trait = target.callstack[target.callstack.length - 2];
            target[trait] = prop;
          } else {
            let funName = target.callstack.pop();
            target.callstack.push(prop, funName);
          }

          return proxy;
        }

        if (prop in target.isList) {
          target.clear();
          return target.isList[prop];
        }

        if (prop === "is_a") {
          target.callstack.push("is_a");
          return proxy;
        }
        if (prop === "is_not_a") {
          target.callstack.push("is_not_a");
          return proxy;
        }

        if (prop in target) {
          target.clear();
          return Reflect.get(...arguments);
        }
        target.callstack.push(prop);
        return proxy;
      },
    });

    return proxy;
  }

  clear() {
    this.callstack = [];
    this.lastResult = [];
  }

  has(num) {
    this.callstack.push(num, "has");
    this.lastResult = [num];
    return this;
  }

  having(num) {
    this.callstack.push(num, "has");
    this.lastResult = [num];
    return this;
  }
}

jane = new Thing("Jane");
jane
  .has(1)
  .head.having(2)
  .eyes.each((eye) => being_the.color.green);
console.log(jane.head.eyes);
