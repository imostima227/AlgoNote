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

function main() {
    const n1 = [4,1,2];
    const n2 = [1,3,4,2];
    // console.log(nextGreaterElement(n1,n2));
    const temperatures = [89,62,70,58,47,47,46,76,100,70]
    console.log(dailyTemperatures(temperatures))
}

main();
