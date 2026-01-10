// 优先队列
// 小顶堆手搓
class MinHeap{
    constructor(){
        this.heap = [];
    }

    // 父节点索引: (idx - 1) >>> 1
    // 左子索引: 2 * idx + 1
    // 右子索引: 2 * idx + 2

    _shiftUp(idx) {
        while(idx > 0) {
            const parent = (idx - 1) >>> 1;
            if (this.heap[idx] >= this.heap[parent]) break;
            [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
            idx = parent;
        }
    }

    _shiftDown(idx) {
        while(2 * idx + 1 < this.heap.length) {
            let swapIdx = 2 * idx + 1;
            if (swapIdx + 1 < this.heap.length && this.heap[swapIdx] > this.heap[swapIdx + 1]) {
                swapIdx = swapIdx + 1;
            }
            if (this.heap[idx] <= this.heap[swapIdx]) break;
            [this.heap[idx], this.heap[swapIdx]] = [this.heap[swapIdx], this.heap[idx]];
            idx = swapIdx;
        }
    }

    push(val) {
        this.heap.push(val);
        this._shiftUp(this.heap.length - 1);
    }

    pop() {
        if (this.heap.length === 0) return NaN;
        const top = this.heap[0];
        const bottom = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = bottom;
            this._shiftDown(0);
        }
        return top;
    }
}