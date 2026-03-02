class MyPromise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
    
        const resolve = (value) => {
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

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }

    then(onFulfilled, onRejected) {
        // 值穿透
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err;};
        
        return new MyPromise((resolve, reject) => {
            const handle = (callback, data) => {
                try{
                    const x = callback(data);
                    resolve(x);
                } catch (err) {
                    reject(err);
                }
            }

            if (this.state === 'fulfilled') {
                setTimeout(() => handle(onFulfilled, this.value), 0);
            } else if (this.state === 'rejected') {
                setTimeout(() => handle(onRejected, this.reason), 0);
            } else {
                this.onResolvedCallbacks.push(() => setTimeout(() => handle(onFulfilled, this.value), 0));
                this.onRejectedCallbacks.push(() => setTimeout(() => handle(onRejected, this.reason), 0));
            }
        });
    }
}

function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (promises == null || typeof promises[Symbol.iterator] != 'function') {
            reject(new TypeError('Argument is not iterable'));
        }

        const length = promises.length;
        if (length == 0) {
            resolve([]);
        }

        const results = Array(length);
        let count = 0;
        promises.forEach((item, idx) => {
            Promise.resolve(item)
                .then(value => {
                    results[idx] = value;
                    count ++;

                    if (count === length) {
                        resolve(results);
                    }
                })
                .catch(reason => {
                    reject(reason);
                });
        });
    });
}