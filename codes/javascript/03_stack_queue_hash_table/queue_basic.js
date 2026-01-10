// 设计循环队列
class MyCircularQueue {
    constructor(k){
        this.size = k + 1;
        this.queue = new Array(k).fill(-1);
        this.front = 0; // 指向队头元素的前一个位置
        this.rear = 0; // 指向队尾元素的位置
    }

    // 从队首获取元素。如果队列为空，返回 -1 。
    Front(){
        if(this.isEmpty())
            return -1;
        return this.queue[(this.front + 1) % this.size];
    }

    // 获取队尾元素。如果队列为空，返回 -1 。
    Rear(){
        if(this.isEmpty())
            return -1;
        return this.queue[this.rear];
    }

    // 向循环队列插入一个元素。如果成功插入则返回真。
    enQueue(value){
        if (this.isFull())
            return false;
        this.rear = (this.rear + 1) % this.size;
        this.queue[this.rear] = value;
        return true;
    }

    // 从循环队列中删除一个元素。如果成功删除则返回真。
    deQueue(){
        if (this.isEmpty())
            return false;
        this.front = (this.front + 1) % this.size;
        return true;
    }

    // 检查循环队列是否为空。
    isEmpty(){
        return this.front === this.rear;
    }

    // 检查循环队列是否已满。
    isFull(){
        return (this.rear + 1) % this.size === this.front;
    }
}

// 数据流中的移动平均值
class MovingAverage {
    constructor(size) {
        this.size = size;
        this.queue = [];
        this.sum = 0;
    }

    next(val) {
        if(this.queue.length === this.size) {
            const out = this.queue.shift()
            this.sum -= - out;
        }
        this.sum += val;
        this.queue.push(val);
        return this.sum / this.queue.length;
    }
}

// 用队列实现栈
class MyStack {
    constructor(){
        this.queue = [];
    }

    push(x) {
        this.queue.push(x);
        const size = this.queue.length;
        for(let i = 0; i < size - 1; i ++){
            this.queue.push(this.queue.shift());
        }
    }

    pop(){
        return this.queue.shift();
    }

    top(){
        return this.queue[0];
    }

    empty(){
        return this.queue.length === 0;
    }
}