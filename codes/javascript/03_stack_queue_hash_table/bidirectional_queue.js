// 滑动窗口中的最大值
const maxSlidingWindow = function(nums, k) {
    const ans = [];
    const queue = []; // 存放索引
    const n = nums.length;

    for (let i = 0; i < n; i ++) {
        // 入队
        while (queue.length > 0 && nums[i] > nums[queue.at(-1)]) {
            queue.pop();
        }
        queue.push(i);
        // 出队
        if (queue[0] <= i - k) { // i = k的时候会把第一个元素出队
            queue.shift();
        }
        // 更新结果
        if (i >= k - 1) {
            ans.push(nums[queue[0]]);
        }
    }
    return ans;
};

function main(){
    const nums = [3,1,1,3];
    const k = 3;
    console.log(maxSlidingWindow(nums, k));
}

main()