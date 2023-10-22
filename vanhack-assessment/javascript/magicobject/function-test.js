const user = {
  firstName: "John",
  lastName: "Doe",
};

const getFullName = function (user) {
  return `${user.firstName} ${user.lastName}`;
};

const getFullNameProxy = new Proxy(getFullName, {
  apply(target, thisArg, args) {
    console.log("target: ", target, " | thisArg: ", thisArg, " | args:", args);
    return target(...args).toUpperCase();
  },
});

console.log(getFullNameProxy(user));
