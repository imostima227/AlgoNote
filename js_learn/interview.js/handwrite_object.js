// 26. 写一个函数复制对象的所有属性
function copyObject(obj) {
    return {...obj};
    // return Object.assign({}, obj);
    // 深拷贝
    // return JSON.parse(JSON.stringfy(obj));
}

// 27. 如何获取对象的所有键
function getKeys(obj) {
    return Object.keys(obj);
}

// 28. 写一个函数检查对象是否有特定属性
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
    // return prop in obj;
}

// 29. 如何合并两个对象
function mergeObject(obj1, obj2) {
    return {...obj1, ...obj2};
    // return Object.assign({}, obj1, obj2);
}

// 30. 写一个函数计算对象中属性的数量
function calcPropertyNums(obj) {
    return Object.keys(obj).length;
}

// 31. 如何删除对象中的某个属性
function deleteProperty(obj, prop) {
    if (prop in obj) {
        delete obj[prop];
    }
    return obj;
}

function deleteProperty1(obj, prop) {
    let {[prop]: deleted, ...rest} = obj;
    return rest;
}

// 32. 写一个函数将对象转化为数组
function objectToArray(obj) {
    return Object.entries(obj);
} 

// 33. 检查一个值是否为对象
function checkIsObject(obj) {
    return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

// 34. 写一个函数翻转对象的键值对
function reversObject(obj) {
    const reversed = {};
    for (const key in obj) {
        reversed[obj[key]] = key;
    }
    return reversed;
}

// 35. 如何创建一个具有原型的对象
function createObjectWithPrototype1( prototype) {
    return Object.create(prototype);
}