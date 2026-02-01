// 最长连续序列
const longestConsecutive = function(nums) {
    const set = new Set(nums);

    let res = 0;
    let curLength = 0;
    for (let num of set) {
        if (set.has(num - 1)) continue; // 不是起点

        while (set.has(num)) {
            curLength ++;
            num ++;
        }
        res = Math.max(res, curLength);

        curLength = 0;
    }

    return res;
};

// LRU缓存
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map(); // key -> node
        this.head = null; // 最旧的在队首
        this.tail = null; // 最新的在队尾

    }

    _removeNode(node) {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
    }

    _moveToTail(node) {
        this._removeNode(node);
        this._addToTail(node);
    }

    _addToTail(node) {
        if (this.tail) {
            this.tail.next = node;
            node.prev = this.tail;
            node.next = null;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this._moveToTail(node);
        return node.value;
    }

    put(key, value) {
        if (this.map.has(key)) {
            const node = this.map.get(key);
            node.value = value;
            this._moveToTail(node);
        }
        else {
            if (this.map.size >= this.capacity){
                // 删除头节点
                this.map.delete(this.head.key);
                this._removeNode(this.head);
                
            }
            const node = new Node(key, value);
            this.map.set(key, node);
            this._addToTail(node);
        }
    }
}