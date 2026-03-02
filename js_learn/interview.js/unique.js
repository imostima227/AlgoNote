// 数组去重
const unique = (arr) => [...new Set(arr)];

const uniqueLegacy = (arr) => {
    return arr.filter((index, item) => arr.indexOf(item) === index); // 无法处理indexOf
}

const unique1 = (arr) => {
    const result = [];
    arr.forEach((el) => {
        if (!result.includes(el)) {
            result.push(el);
        }
    })
    return result;
}

// 完整版
const uniquePower = function(arr, key) {
    if (!key) {
        return [...new Set(arr)];
    }
    const set = new Set();
    return arr.filter(item => {
        const value = (item && typeof item === 'object') ? item[key] : item;
        if (set.has(value)) return false;
        set.add(value);
        return true;
    })
}

const flatten = function (arr) {
    return arr.reduce((acc, cur) => {
        return acc.concat(Array.isArray(cur) ? flatten(cur) : cur); 
    }, []);
}