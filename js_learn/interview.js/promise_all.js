Promise.myAll = function (promises) {
    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        const results = [];
        let completedCnt = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                results[index] = value;
                completedCnt ++;
                if (completedCnt === promises.length) {
                    resolve(results);
                }
            }).catch(reason => reject(reason));
        });
    });
}