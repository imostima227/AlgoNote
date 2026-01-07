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

// 逆波兰数求解
const evalRPN = function(tokens) {
    const stack = [];
    
    for (const token of tokens) {
        if (token === '+' || token === '-' || token === '*' || token === '/'){
            const num2 = stack.pop();
            const num1 = stack.pop();
            
            let res = 0;
            switch (token) {
                case '+':
                    res = num1 + num2;
                    break;
                case '-':
                    res = num1 - num2;
                    break;
                case '*':
                    res = num1 * num2;
                    break;
                case '/':
                    res = Math.trunc(num1 / num2);
                    break;
            }
            stack.push(res);
        } else {
            stack.push(Number(token))
        }
    }
    return stack.at(-1);
};

// 字符串解码
const decodeString = function(s) {
    const stack = [];
    let curNum = 0;
    let curStr = '';
    for(const c of s){
        if (c >= '0' && c <= '9') {
            curNum = curNum * 10 + Number(c); // 处理多位数
        } 
        else if (c == '[') {
            // 入栈
            stack.push([curNum, curStr]);
            curNum = 0;
            curStr = '';
        }
        else if (c == ']') {
            const [preNum, preStr] = stack.pop();
            curStr = preStr + curStr.repeat(preNum); 
        }
        else // 普通字符
            curStr += c;
    }
    return curStr;
};

// 验证栈队列
const validateStackSequences = function(pushed, popped) {
    const stack = [];
    let pop_i = 0;
    for (const n of pushed) {
        stack.push(n);
        while (stack.length && stack.at(-1) === popped[pop_i]) {
            stack.pop();
            pop_i++;
        }
    }

    return stack.length === 0;
};


function main(){
    // const s = '3+2*2';
    // console.log(calculate(s));
    // const tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"];
    // console.log(evalRPN(tokens))
    const pushed = [1,2,3,4,5];
    const popped = [4,5,3,2,1];
    validateStackSequences(pushed, popped);
}

main()