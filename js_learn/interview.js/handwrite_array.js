// 16. 移除数组中的重复元素
function removeDuplicates(arr) {
    return new Set([...arr]);
}

function removeDuplicates1(arr) {
    return arr.filter((value, index) => arr.indexOf(value) === index);
}

// 17. 如何将两个数组合并
function mergeArray(arr1, arr2) {
    return [...arr1, ...arr2];
}

function mergeArray2(arr1, arr2) {
    return arr1.concat(arr2);
}

// 18. 写一个函数计算数组中所有数字的平均值
function calcAvg(arr) {
    let sum = arr.reduce((acc, cur) => acc + cur, 0);
    return sum / arr.length;
}

// 19. 如何对数组进行排序
function sortArray(arr) { // 针对数字数组，升序
    return arr.sort((a, b) => a - b);
}

// 20. 写一个函数查找数组中特定元素的索引
function findIndex(arr, element) {
    return arr.indexOf(element);
    // return arr.findIndex(item => item === element);
    // return arr.findIndex(element);
}

// 21. 如何过滤数组中的偶数
function filterEvenNumbers(arr) {
    return arr.filter(value => value % 2 === 0);
}

// 22. 写一个函数将数组中每个元素乘2
function multiphyBy2(arr) {
    return arr.map(value => value * 2);
}

// 23. 检查数组中是否包含某个元素
function checkContains(arr, element) {
    return arr.indexOf(element) !== -1;
    // return arr.includes(element);
}

// 24. 写一个函数将二维数组扁平化
function flatten(arr) {
    return arr.flat();
    // return [].concat(...arr);
    //return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur),[])
}

// 25. 如何获取数组的最后一个元素？
function getLastIndex(arr) {
    return arr.at(-1);
    // return arr[arr.length - 1];
}