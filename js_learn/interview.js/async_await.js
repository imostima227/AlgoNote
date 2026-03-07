// 普通的async/await写法
async function fetchData() {
    const res = await fetch('/api/data')
    const data = await res.json()
    return data;
}

// Generator写法
function* genFetchData() {
    const res = yield fetch('/api/data')
    const data = yield res.json()
    return data;
}

run(genFetchData);

function run(gen) {
    const it = gen();
    function step(value) {
        const result = it.next(value);
        if (result.done) return Promise.resolve(result.value);
        return Promise.resolve(result.value)
            .then(val => step(val))
            .catch(err => {
                it.throw(err);
                return step();
            }) 
    }
    return step();
}