Promise.myRace = function(promises){
    return new Promise((resolve, reject) => {
        promises.forEach(promise => {
            Promise.resolve(promise).then(value => {
                resolve(value);
            }).catch(reason => reject(reason));
        });
    });
}