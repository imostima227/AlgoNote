const url = '';
const futureData = new Promise((resolve, reject) => {
    // 模拟耗时请求
    const success = true;
    if (success) {
        // 假设这里直接返回了一个包含 json 方法的对象
        resolve({ json: () => ({ user: 'Gemini' }) }); 
    } else {
        reject(new Error("Request Failed"));
    }
}).then(result => {
    return result.json(); // 返回一个新值，会被包装成一个新的 fulfilled 状态的 Promise
});


/* 
    第一题
    script start
    promise 2
    script end
    timeout 1
    promise 1
    timeout 2
    promise 3

    第二题
    script start
    async1 start
    async2
    promise 1
    script end
    async1 end
    promise 2
    setTimeout

    第三题
    0
    1
    4 这里出错了
    2
    3
    5
    6
    正确答案： 0 1 2 3 4 5 6
*/

// 第一题
console.log('script start');

setTimeout(() => {
    console.log('timeout 1');
    Promise.resolve().then(() => {
        console.log('promise 1');
    });
}, 0);

new Promise((resolve) => {
    console.log('promise 2');
    setTimeout(() => {
        console.log('timeout 2');
        resolve();
    }, 0);
}).then(() => {
    console.log('promise 3');
});

console.log('script end');

// 第二题
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(() => {
    console.log('setTimeout');
}, 0);

async1();

new Promise((resolve) => {
    console.log('promise 1');
    resolve();
}).then(() => {
    console.log('promise 2');
});

console.log('script end');

// 第三题
Promise.resolve().then(() => { // 微任务1
    console.log(0);
    return Promise.resolve(4); 
}).then((res) => {  // 微任务3
    console.log(res);
});

Promise.resolve().then(() => { // 微任务2
    console.log(1);
}).then(() => { // 微任务4
    console.log(2);
}).then(() => { // 微任务5
    console.log(3);
}).then(() => {
    console.log(5);
}).then(() => {
    console.log(6);
});