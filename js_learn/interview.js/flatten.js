// 数组扁平化
// 日常使用
// arr.flat(Infinity);

function flatten(arr) {
    return arr.reduce(
        (prev, curr) => prev.concat(Array.isArray(curr) ? flatten(curr) : curr)
    , [])
}

function flattenWhile(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr;
}
