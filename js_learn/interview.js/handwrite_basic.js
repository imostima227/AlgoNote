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

// 12. 写一个函数返回数组中的最大值
function findMax(arr) {
    return Math.max(...arr);
}

function findMax1(arr) {
    return arr.reduce((acc, cur) => acc > cur ? acc : cur, -Infinity);
}

// 13. 反转一个字符串
function reverseStr(str) {
    // String类型本身没有reverse方法，需要用split先转为数组，再使用
    // 数组的reverse方法，再使用join转为字符串
    return str.split('').reverse().join('');
    // 更健壮的写法 return [...str].split('').reverse().join('')
    // 这种写法的有点是可以处理Emoji，因为split方法不能正确处理Unicode字符
    // 而ES6的扩展运算符可以
}

// 14. 检查一个函数是否为质数
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i ++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// 15. 如何获取当前的日期和时间
function getDateAndTime(){
    let now = new Date();

    console.log(now.toLocaleDateString());
    console.log(now.toLocaleTimeString());
}


