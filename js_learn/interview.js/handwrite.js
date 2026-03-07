// 1. 如何创建一个具有原型的对象？
function createObjectWithPrototype(prototype){
    return Object.create(prototype);
}

// 2. 写一个函数判断一个数字是否为偶数
function isEven(num) {
    return num % 2 === 0;
}

// 3. 如何创建一个包含五个元素的数组
// const arr = Array(5);
// const arr1 = Array.from({ length: 5 });

// 4. 写一个函数计算两个数的和
function add(a, b) {
    return a + b;
}

// 5. 如何获得字符串的长度
// const s = '123124';
// s.length;

// 6. 写一个for循环打印1到10的数字
for (let i = 1; i <= 10; i ++) {
    console.log(i);
}

// 7. 如何检查一个对象是否为undefined
function checkUndefined (obj) {
    return typeof obj === 'undefined';
}

// 10. 写一个函数检查字符串是否包含特定子字符串。
function checkContainsSubstr(str, sub){
    return str.includes(sub);
    // return str.indexOf(sub) !== -1;
}

// 11. 将字符串转换为数字
function strToNum(str){
    return +str;
    // return Number(str);
    // return parseInt(str);
}