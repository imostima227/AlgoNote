function outer() {
    // 1. 定义一个大对象
    const heavyObject = new Array(10000000).fill('Big Data'); 

    // 2. 闭包 A：用到了 heavyObject
    // 注意：unusedFunc 并没有被返回，也没被执行，仅仅是定义在这里
    function unusedFunc() {
        console.log(heavyObject); 
    }

    // 3. 闭包 B：完全没用到 heavyObject
    function inner() {
        console.log("I am innocent!");
    }

    // 4. 返回闭包 B
    return inner;
}

const myFunc = outer(); 
// 问题来了：heavyObject 还在内存里吗？
console.log(myFunc);