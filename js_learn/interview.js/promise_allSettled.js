Promise.myAllSettled = function(promises) {
    if (promises.length === 0) {
        return Promise.resolve([]);
    }

    return new Promise((resolve, reject) => {
        const result = [];
        let completedCnt = 0;
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                result[index] = { status: 'fulfilled', value};
                completedCnt ++;
                if (completedCnt === promises.length) {
                    resolve(result);
                }
            }).catch( reason => {
                result[index] = { status: 'rejected', value: reason};
                completedCnt ++;
                if (completedCnt === promises.length) {
                    resolve(result);
                }
            });
        });
    });
}