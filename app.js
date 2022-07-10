
let str = "Hi My name"

let s = str.split("").reverse().join("")
console.log(s);

let n = ""
let totalItems = str.length - 1;
for (let i = totalItems; i > 0; i++) {
    n += str[i]
}

console.log(n)