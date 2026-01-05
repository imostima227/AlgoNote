// 有效的括号
const isValid = function(s) {
    // 1. 剪枝：如果是奇数长度，绝对不可能闭合，直接 false
    if (s.length % 2 !== 0) return false;

    // 2. 建立字典：右括号 -> 左括号
    // 这样写不仅清晰，而且查找速度是 O(1)
    const map = {
        ')': '(',
        ']': '[',
        '}': '{'
    };

    const stack = [];
    for (const c of s){
        // 若c是右括号
        if (map[c]){
            if (stack.pop() !== map[c]) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
};

// 字符串表达式
function isDigit(c) {
    return c >= '0' && c <= '9';
}

const calculate = function(s) {
    const stack = [];
    let op = '+';
    let ans = 0;
    for(let i = 0; i < s.length; i++) {
        if(s[i] === ' ') continue;
        if(isDigit(s[i])) {
            let num = s[i] - '0';
            while (i + 1 < s.length && isDigit(s[i + 1])){
                i ++;
                num = num * 10 + (s[i] - '0');
            }
            if (op === '+') {
                stack.push(num);
            }
            else if (op === '-') {
                stack.push(-num);
            }
            else if (op === '*') {
                const top = stack.pop();
                stack.push(top * num);
            }
            else if (op === '/') {
                const top = stack.pop();
                stack.push(Math.trunc(top / num));
            }
        }
        else
            op = s[i];
    }
    for (const num of stack) {
        ans += num;
    }
    return ans;
};

// 最小栈
class MinStack{
    stack = [];
    minStack = [];
    constructor(){

    }

    push(val){
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack.at(-1)) {
            this.minStack.push(val);
        }
    }

    pop() {
        if (this.stack.length === 0) return;
        const val = this.stack.pop();
        if (val === this.minStack.at(-1)) {
            this.minStack.pop();
        }
    }

    top() {
        return this.stack.at(-1);
    }

    getMin() {
        return this.minStack.at(-1);
    }
}

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */



function main(){
    const s = '3+2*2';
    console.log(calculate(s));
}

main()