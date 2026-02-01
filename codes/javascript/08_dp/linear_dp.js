// 最长递增子序列（LIS）
const lengthOfLIS = function(nums) {
    const dp = Array(nums.length).fill(1); // dp[i]表示以idx为i的元素结尾的最长严格递增子序列的长度

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j ++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp);

};

// 更优的做法
const lengthOfLISBest = function(nums) {
    if (!nums.length) return 0; 

    const tails = []; // tails[i]表示长度为i+1的所有递增子序列中，最小的结尾数值

    for (const x of nums) {
        // 在tails中找第一个大于等于x的位置
        let left = 0, right = tails.length; // right指向末尾之后
        while (left < right) {
            let mid = (left + right) >>> 1;
            if (tails[mid] < x) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        tails[left] = x;
    }

    return tails.length;
}

// 最大子数组和
const maxSubArray = function(nums) {
    const dp = Array(nums.length).fill(0);
    dp[0] = nums[0];

    for (let i = 1; i < nums.length; i ++) {
        if (dp[i-1] > 0) {
            dp[i] = dp[i-1] + nums[i];
        } else {
            dp[i] = nums[i];
        }
    }

    return Math.max(...dp);
};

// 打家劫舍
const rob = function(nums) {
    if (nums.length <= 2) {
        return Math.max(...nums);
    }
    const n =nums.length;
    const dp = Array(n); // dp[i]表示前i间房屋能偷到的最大金额

    dp[0] = nums[0];
    dp[1] = Math.max(dp[0], nums[1]);

    for (let i = 2; i < n; i ++) {
        dp[i] = Math.max(dp[i-1], nums[i] + dp[i-2]);
    }

    return dp[n-1];
};

// 乘积最大子数组
const maxProduct = function(nums) {
    const n = nums.length;
    let maxDp = nums[0];
    let minDp = nums[0];
    let result = maxDp;

    for (let i = 1; i < n; i ++) {
        const prevMax = maxDp;

        maxDp = Math.max(nums[i], Math.max(prevMax * nums[i], minDp * nums[i]));
        minDp = Math.min(nums[i], Math.min(prevMax * nums[i], minDp * nums[i]));
    
        result = Math.max(result, maxDp);
    }

    return result;
};