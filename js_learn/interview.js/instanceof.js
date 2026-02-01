function myInstanceof (left, right) {
    if (typeof left !== 'object'  || left === null) {
        return false;
    }

    let proto = Object.getPrototypeOf(left);
    while (true) {
        if (proto === null) return false;
        if (proto === right.prototype) return true;
        proto = Object.getPrototypeOf(proto);
    }
}

console.log(myInstanceof([], Array));     // true
console.log(myInstanceof([], Object));    // true
console.log(myInstanceof({}, Function));  // false