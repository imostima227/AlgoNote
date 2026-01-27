// 等式方程的可满足性
class UnionFindEquation {
    constructor() {
        this.fa = [...Array(26).keys()];
        this.depth = Array(26).fill(1);
    }

    toNum(ch) {
        return  ch.charCodeAt(0) - 'a'.charCodeAt(0);
    }

    find(x) {
        while (x != this.fa[x]) {
            this.fa[x] = this.fa[this.fa[x]]; // 隔代压缩
            x = this.fa[x];
        }
        
        return x;
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        if (this.depth[rootX] > this.depth[rootY]) {
            this.fa[rootY] = rootX;
        }
        else if (this.depth[rootX] < this.depth[rootY]) {
            this.fa[rootX] = rootY;
        }
        else {
            this.fa[rootY] = rootX;
            this.depth[rootX] += 1;
        }

        return true;
    }

    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }
}

const equationsPossible = function(equations) {
    const unionFind = new UnionFindEquation();

    for (const e of equations) {
        if (e[1] === '!') continue;

        const x = unionFind.toNum(e[0]);
        const y = unionFind.toNum(e[3]);

        unionFind.union(x, y);
    }

    for (const e of equations) {
        if (e[1] === '=') continue;

        const x = unionFind.toNum(e[0]);
        const y = unionFind.toNum(e[3]);

        if (unionFind.isConnected(x, y) === true) return false;
    }

    return true;
};

// 冗余连接
const findRedundantConnection = function(edges) {
    const n = edges.length;
    const fa = [...Array(n).keys()];
    const depth = Array(n).fill(0);

    const find = function(x) {
        while (x !== fa[x]) {
            fa[x] = fa[fa[x]];
            x = fa[x];
        }
        return x;
    }

    const union = function(x, y) {
        const rootX = find(x);
        const rootY = find(y);

        if (rootX === rootY) return false;

        if (depth[rootX] > depth[rootY]) {
            fa[rootY] = rootX;
        }
        else if (depth[rootY] > depth[rootX]) {
            fa[rootX] = rootY;
        }
        else {
            fa[rootY] = rootX;
            depth[rootX] ++;
        }

        return true;
    }

    const isConnected = function(x, y) {
        return find(x) === find(y);
    }

    for (const edge of edges) {
        const x = edge[0];
        const y = edge[1];

        if (isConnected(x, y)) return edge;
        union(x, y);
    }

    return [];
};

function main() {
    const equations = ["c==c","b==d","x!=z"];
    console.log(equationsPossible(equations));
}

main()