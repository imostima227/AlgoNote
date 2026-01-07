const nextGreaterElement = function(nums1, nums2) {
    const stack = [];
    const map = new Map();
    // 找更大，构建递增栈
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

function main() {
    const n1 = [4,1,2];
    const n2 = [1,3,4,2];
    console.log(nextGreaterElement(n1,n2));
}

main();
