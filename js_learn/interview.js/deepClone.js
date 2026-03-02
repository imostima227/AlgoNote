function deepClone(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (map.has(obj)) return map.get(obj);

    const newObj = Array.isArray(obj) ? [] : {};

    map.set(obj, newObj);

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = deepClone(obj[key], map);
        }
    }

    return newObj;
}