const nextGreaterElement = function(nums1, nums2) {
    const stack = [];
    const map = new Map();
    // 找更大，构建单调递减栈
    for (const n of nums2) {
        while(stack.length && n >= stack.at(-1)) {
            const out = stack.pop();
            map.set(out,n);
        }
        stack.push(n);
    }
    return nums1.map(n => {
        return map.has(n) ? map.get(n) : -1;
    });
};


// 每日温度
const dailyTemperatures = function(temperatures) {
    const ans = new Array(temperatures.length).fill(0);
    const stack = [];
    // 找右侧更大，找单调递减栈
    for (const idx of temperatures.keys()) {
        while (stack.length && temperatures[idx] > temperatures[stack.at(-1)]) {
            const i = stack.pop();
            ans[i] = idx - i;
        }
        stack.push(idx);
    }
    return ans;
};

// 去除重复字母
const removeDuplicateLetters = function(s) {
    const count = {};
    for (const c of s) {
        count[c] = (count[c] ?? 0) + 1;
    }
    const stack = [];
    const inStack = new Set();
    for (const c of s) {
        count[c] --;
        // 如果已经在栈中，忽略
        if (inStack.has(c)) continue;
        while (stack.length && c < stack.at(-1) && count[stack.at(-1)] > 0) {
            const out = stack.pop();
            inStack.delete(out);
        }
        stack.push(c);
        inStack.add(c);
    }
    return stack.join('');
};

// 买卖股票的最佳实际(并非最佳实践)
const maxProfitOld = function(prices) {
    const stack = [];
    let profit = 0;

    for (let i = 0; i < prices.length; i++) {
        while (stack.length > 0 && stack.at(-1) > prices[i]) {
            stack.pop();
        }
        profit = Math.max(profit, stack.length ? prices[i] - stack[0] : 0);
        stack.push(prices[i]);
    }

    return profit;
};

const maxProfit = function(prices) {
    let minPrice = Infinity;
    let profit = 0;

    for (const price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > profit) {
            profit = price - minPrice;
        }
    }

    return profit;
}

function main() {
    const n1 = [4,1,2];
    const n2 = [1,3,4,2];
    // console.log(nextGreaterElement(n1,n2));
    const temperatures = [89,62,70,58,47,47,46,76,100,70]
    console.log(dailyTemperatures(temperatures))
}

main();
