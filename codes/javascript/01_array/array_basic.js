// 多数元素
const majorityElement = function(nums) {
    if (nums.length === 1) {
        return nums[0];
    }

    let candidate = 0;
    let cnt = 0;
    for (const num of nums) {
        if (cnt === 0) {
            candidate = num;
        }

        cnt = (candidate === num) ? cnt + 1: cnt - 1;
    }

    return candidate;
};

// 除了自身以外数组的乘积
const productExceptSelf = function(nums) {
    const n = nums.length;
    const left = Array(n);
    const right = Array(n);
    const res = Array(n);

    left[0] = 1;
    for (let i = 1; i < n; i ++) {
        left[i] = left[i - 1] * nums[i - 1];
    }

    right[n - 1] = 1;
    for (let i = n - 2; i >= 0; i --) {
        right[i] = right[i + 1] * nums[i + 1]; 
    }

    for (let i = 0; i < n; i ++) {
        res[i] = left[i] * right[i];
    }

    return res;
};

const productExceptSelfBest = function(nums) {
    const n = nums.length;
    const res = Array(n);

    res[0] = 1;
    for (let i = 1; i < n; i ++) {
        res[i] = res[i - 1] * nums[i - 1];
    }

    let rightRes = 1;
    for (let i = n - 2; i >= 0; i --) {
        rightRes *= nums[i + 1];
        res[i] *= rightRes;
    }

    return res;
}