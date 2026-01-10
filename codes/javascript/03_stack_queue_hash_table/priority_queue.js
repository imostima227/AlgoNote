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

// 数组中第K个最大元素
const findKthLargest = function(nums, k) {
    const _shiftDown = function(nums, idx, end) {
        while(2 * idx + 1 < end) {
            let swapIdx = 2 * idx + 1;
            if (swapIdx + 1 < end && nums[swapIdx] < nums[swapIdx + 1]) {
                swapIdx = swapIdx + 1;
            }
            if (nums[idx] >= nums[swapIdx]) break;
            [nums[idx], nums[swapIdx]] = [nums[swapIdx], nums[idx]];
            idx = swapIdx;
        }
    }

    const buildMaxHeap = function(nums){
        const size = nums.length;
        for (let i = (size - 2) >> 1; i >= 0; i --) {
            _shiftDown(nums, i, size);
        }
    }

    const size = nums.length;
    buildMaxHeap(nums);
    for (let i = 0; i < k - 1; i ++) {
        [nums[0],nums[size - 1 - i]] = [nums[size - 1 - i], nums[0]]
        _shiftDown(nums, 0, size - i - 1);
    }
    return nums[0];
};

const findKthLargest1 = function(nums, k) {
    const size = nums.length;
    const targetIdx = size - k;

    const quickSelect = (left, right) => {
        if (left >= right) return nums[left];
        let pivotIdx = Math.floor(Math.random() * (right - left + 1)) + left;
        swap(nums, pivotIdx, right);
        
        pivotIdx = partition(nums, left, right);
        if (pivotIdx === targetIdx) return nums[targetIdx];
        else if (pivotIdx < targetIdx) 
            return quickSelect(pivotIdx + 1, right);
        else
            return quickSelect(left, pivotIdx - 1);
    }

    return quickSelect(0, size - 1);
}

const partition = (nums, left, right) => {
        let pivot = nums[right];
        let i = left;
        for (let j = left; j < right; j ++) {
            if (nums[j] <= pivot) {
                swap(nums, i, j);
                i ++;
            }
        }
        swap(nums, i, right);
        return i;
    }

const swap = function(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

// 前k个高频元素
const topKFrequent = function(nums, k) {
    // 统计每个元素出现的次数
    const map = new Map();
    for (const n of nums) {
        map.set(n, (map.get(n) || 0) + 1)
    }
    // 
    const arr = [];
    for (const n of map.keys()){
        arr.push(n);
    }
    const size = arr.length;

    const _shiftDown = function(idx, end) {
        while (2 * idx + 1 < end) {
            let swapIdx = 2 * idx + 1;
            if (swapIdx + 1 < end && map.get(arr[swapIdx]) > map.get(arr[swapIdx + 1])){
                swapIdx = swapIdx + 1;
            }
            if (map.get(arr[idx]) <= map.get(arr[swapIdx])) break;
            [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
            idx = swapIdx;   
        }
    }

    const buildMinHeap = function() {
        for (let i = (size - 2) >> 1; i >= 0; i--) {
            _shiftDown(i, size);
        }
    }

    buildMinHeap();
    for (let i = 0; i < size - k; i ++) {
        [arr[0], arr[size - i - 1]] = [arr[size - i - 1], arr[0]]
        _shiftDown(0, size - i - 1);
    }
    return arr.slice(0, k);

};




function main(){
    // const nums = [1];
    // const k = 1;
    // console.log(findKthLargest1(nums, k));
    const nums = [1,2,1,2,1,2,3,1,3,2];
    const k = 2;

    console.log(topKFrequent(nums, k))
}

main();