// 实现Trie

class TrieNode {
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
    }

    insert(word) {
        let cur = this.root;
        for (const ch of word) {
            if (!cur.children.has(ch)) {
                cur.children.set(ch, new TrieNode());
            }
            cur = cur.children.get(ch);
        }
        cur.isEnd = true;
    }

    search(word) {
        let cur = this.root;
        for (const ch of word) {
            if (!cur.children.has(ch)) return false;
            cur = cur.children.get(ch);
        }
        return cur.isEnd;
    }

    startWith(prefix) {
        let cur = this.root;
        for (const ch of prefix) {
            if (!cur.children.has(ch)) return false;
            cur = cur.children.get(ch);
        }
        return true;
    }
}

// 添加与搜索单词

class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        let cur = this.root;
        for (const ch of word) {
            if (!cur.children.has(ch)) {
                cur.children.set(ch, new TrieNode());
            }
            cur = cur.children.get(ch);
        }
        cur.isEnd = true;
    }

    _dfs(word, idx, node) { // 对某个节点的所有子树搜索
        // 边界判断 xxx
        if (idx >= word.length) {
            return node.isEnd;
        }
        if (word[idx] === '.') {
            const childNodes = node.children.values();
            for (const childNode of childNodes) {
                if (this._dfs(word, idx + 1, childNode)) return true;// 找到一个就算成果
            }
            return false;
        } else {
            if (!node.children.has(word[idx])) return false;
            return this._dfs(word, idx + 1, node.children.get(word[idx]));
        }
    }

    search(word) {
        let cur = this.root;
        return this._dfs(word, 0, cur);
    }

}

// 搜索推荐系统
class SuggestTree {
    constructor(products) {
        products.sort();
        this.root = new TrieNode();
        for (const product of products) {
            this.insert(product);
        }
    }

    insert(product) {
        let node = this.root;
        for (const ch of product) {
            if (!node.children.has(ch)) {
                node.children.set(ch, new TrieNode());
            }
            node = node.children.get(ch);
        }
        node.isEnd = true;
    }

    search(prefix) {
        let node = this.root;
        // 定位前缀节点
        for (const ch of prefix) {
            if (!node.children.has(ch)) {
                return []; // 修正 Bug：匹配不到直接返回空，不要 break 后继续搜
            }
            node = node.children.get(ch);
        }
        
        // 开始 DFS，找满 3 个就停
        const res = [];
        this._dfs(node, res, prefix);
        return res;
    }

    _dfs(node, arr, curWord) { // 返回字符串
        // 边界处理
        if (node.isEnd) {
            arr.push(curWord);
        }

        if (arr.length === 3) return;

        for (const ch of node.children.keys()) {
            this._dfs(node.children.get(ch), arr, curWord + ch);
        }
    }
    
}

const suggestedProducts = function(products, searchWord) {
    const suggestedTree = new SuggestTree(products);
    const ans = [];
    let prefix = '';

    for (const ch of searchWord) {
        prefix += ch;
        ans.push(suggestedTree.search(prefix));
    }
    return ans;
};

function main(){
    // const dict = new WordDictionary();
    // dict.addWord("at");
    // dict.addWord("and"); 
    // dict.addWord("an"); 
    // dict.addWord("add"); 
    // dict.search("a"); 
    // dict.search(".at"); 
    // dict.addWord("bat"); 
    // dict.search(".at"); // wrong
    // dict.search("an.");2
    // dict.search("a.d.");
    // dict.search("b.");
    // dict.search("a.d"); // wrong
    // dict.search(".");
    const products = ["havana"];
    const searchWord = "tatiana";
    console.log(suggestedProducts(products, searchWord));
}

main()