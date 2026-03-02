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

// 汉明距离
const hammingDistanceOld = function(x, y) {
    let ans = 0;

    const to2String = function(num){
        let s = '';
        while (num > 0) {
            let y = num % 2;
            s += String(y);
            num = Math.floor(num / 2);
        }

        return s;
    };

    let sX = to2String(x);
    let sY = to2String(y);

    let len = Math.max(sX.length, sY.length);
    while (sX.length < len) {
        sX += '0';
    }

    while (sY.length < len) {
        sY += '0';
    }

    for (let i = 0; i < len; i++) {
        if (sX[i] !== sY[i]) ans ++;
    }

    return ans;
    
};

const hammingDistance = function(x, y) {
    let xoy = x ^ y;
    let ans = 0;

    while (xoy) {
        ans += xoy & 1;
        xoy >>= 1;
    }

    return ans;
}

// 移动零
// 快慢指针
const moveZeroes = function(nums) {
    let left = 0, right = 0;
    while (right < nums.length) {
        if (nums[right] !== 0) {
            if (right > left) {
                [nums[left], nums[right]] = [nums[right], nums[left]];
            }
            left ++;
        }
        right ++;
    }
};

// 盛最多水的容器
const maxArea = function(height) {
    let ans = 0;
    let left = 0, right = height.length - 1;

    while (left < right) {
        const v = (right - left) * Math.min(height[right],height[left]);
        ans = Math.max(ans, v);

        if (height[left] < height[right]) {
            left ++;
        } else {
            right --;
        }
    }

    return ans;
};

// 合并区间
const merge = function(intervals) {
    if (intervals.length === 1) return intervals;
    intervals.sort((a, b) => a[0] - b[0]);

    const ans = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const curr = intervals[i];

        const last = ans[ans.length - 1];
        
        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
            ans.push(curr);
        }
    }

    return ans;
};

function main() {
    console.log(hammingDistance(1,4));
}

main();