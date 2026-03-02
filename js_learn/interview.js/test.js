// 手写深拷贝
function myDeepClone(obj, weakMap = new WeakMap()) {
    // 判断类型
    if (obj === null || typeof obj !== 'object') return obj;

    // 判断循环引用
    if (weakMap.has(obj)) return weakMap.get(obj);

    // 判断数组
    const newObj = Array.isArray(obj) ? [] : {};

    weakMap.set(obj, newObj);

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = myDeepClone(obj[key], weakMap);
        }
    }

    return newObj;
}

// 写一个简单的闭包
function counter(count) {

    return {
        addCount: function() {
            count ++;
        },
        subCount: function() {
            count --;
        },
        getCount: function() {
            console.log(count);
        }
    }
}

// 实现自己的myBind函数
Function.prototype.myBind = function (thisArg, ...args) {
    // 记录调用bind的原始函数对象，如果返回的函数被new调用，则以这个原始函数对象作为构造函数
    const originalThis = this;

    if (typeof originalThis !== 'function') {
        throw new Error('not callable');
    }

    const boundFunc = function(...newArgs) {
        const totalArgs = args.concat(newArgs);
        
        if (this instanceof boundFunc) {
            // 作为new被调用
            originalThis.apply(this, totalArgs);
            return this;
            
        } else {
            return originalThis.apply(thisArg, totalArgs);
        }
    }

    boundFunc.prototype = Object.create(originalThis.prototype);

    return boundFunc;
}

// 柯里化
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            const context = this;
            return function(...restArgs) {
                return curried.apply(context, args.concat(restArgs));
            }
        }
    }
}

// 手写Promise
class MyPromise {
    state = 'pending';
    value = undefined;
    reason = undefined;
    onResolvedCallbacks = [];
    onRejectedCallbacks = [];

    constructor(executor) {
        const resolve = (value) => {
            // 重要细节，加状态锁，避免状态覆盖
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
            
        }

        try{
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };
        return new MyPromise((resolve, reject) => {

            const handler = (callback, data) => {
                try {
                    const x = callback(data);
                    resolve(x)
                } catch (err) {
                    reject(err);
                }
            }

            if (this.state === 'fulfilled') {
                queueMicrotask(() => handler(onFulfilled, this.value));
            } else if (this.state === 'rejected') {
                queueMicrotask(() => handler(onRejected, this.reason));
            } else {
                // push的应该是一个函数
                this.onResolvedCallbacks.push(() => queueMicrotask(() => handler(onFulfilled, this.value)));
                this.onRejectedCallbacks.push(() => queueMicrotask(() => handler(onRejected, this.reason)));
            }
        });
    }
}

// 深拷贝
function deepClone1(obj, weakMap = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (weakMap.has(obj)) return weakMap.get(obj);

    const newObj = Array.isArray(obj) ? [] : {};
    weakMap.set(obj, newObj);

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            newObj[key] = deepClone1(obj[key], weakMap);
        }
    }
}

// bind
Function.prototype.myBind1 = function(thisArg, ...args) {
    const func = this;
    
    if (typeof func !== 'function') {
        throw new Error('not callable');
    }

    const boundFunc = function (...newArgs) {
        const totalArgs = args.concat(newArgs);

        if (this instanceof boundFunc) {
            func.apply(this, totalArgs);
        } else {
            func.apply(thisArg, totalArgs);
        }
    }

    boundFunc.prototype = Object.create(func.prototype);

    return boundFunc;

}

class EventEmitter {
    _events = new Map();

    on(eventName, callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('Listener must be function!');
        }

        if (!this._events.has(eventName)) {
            this._events.set(eventName, []);
        }
        this._events.get(eventName).push(callback);

        return this;
    }

    emit(eventName, ...args) {
        if (!this._events.has(eventName)) return false;

        const listeners = this._events.get(eventName);

        for (const listener of listeners) {
            // 需要用try catch包裹
            try {
                listener(...args);
            } catch (error) {
                console.error(`Error in event listener for "${eventName}":`, error);
            }
        }

        return true; 
    }

    off(eventName, callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('Listener must be function!');
        }

        if (!this._events.has(eventName)) return this;

        const listeners = this._events.get(eventName);

        const index = listeners.indexOf(callback);

        if (index !== -1) {
            listeners.splice(index, 1);
        }

        if (listeners.length === 0) {
            this._events.delete(eventName);
        } 

        return this;
    }

    once(eventName, callback) {
        if (typeof callback !== 'function') {
            throw new TypeError('Listener must be function!');
        }

        const onceCb = function(...args) {
            this.off(eventName, onceCb);

            callback.apply(this, args);
        }

        this.on(eventName, onceCb);
    }
}