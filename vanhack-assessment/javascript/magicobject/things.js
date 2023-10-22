class Thing {
  constructor(name) {
    this.name = name;
    this.is_a = {
      woman: true,
    };

    this.is_not_a = { man: true };

    for (let key in this.is_a) {
      let keyname = "is_a_" + key;
      this[keyname] = this.is_a[key];
    }
  }
}

var jane = new Thing("Jane");

const print = (val) => console.log(val);

print(jane.name);
print(jane.is_a);
print(jane.is_a.woman);
print(jane.is_not_a.man);
