// 岛屿数量
const numIslands = function(grid) {
    
    const m = grid.length;
    const n = grid[0].length;
    let ans = 0;
    
    const dfs = function(grid, i, j) {

        if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') return;

        grid[i][j] = '0';

        dfs(grid, i - 1, j);
        dfs(grid, i + 1, j);
        dfs(grid, i, j - 1);
        dfs(grid, i, j + 1);
    }

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            if (grid[i][j] === '1') {
                dfs(grid, i, j);
                ans ++;
            }
        }
    }

    return ans;
};

// 全排列
const permute = function(nums) {
    const map = new Map();
    const ans = [];
    const n = nums.length;

    for (const num of nums) {
        map.set(num, false);
    }

    const dfs = function(stack){
        if (stack.length === n) {
            ans.push([...stack]);
            return;
        }

        for (const num of nums) {
            if (map.get(num)) continue;
            
            stack.push(num);
            map.set(num, true);

            dfs(stack);

            stack.pop();
            map.set(num, false);
        }
    }

    dfs([]);

    return ans;
}
const combinationSum = function(candidates, target) {
    const ans = [];
    const n = candidates.length;

    candidates.sort();

    const backtrack = function(remain, path, start) {
        if (remain === 0) {
            ans.push([...path]);
            return;
        }

        if (remain < 0) {
            return;
        }

        for (let i = start; i < n; i ++) {
            const num = candidates[i];
            if (remain - num < 0) break;
            path.push(num);
            backtrack(remain - num, path, i);
            path.pop();
        }
    }

    backtrack(target, [], 0);
    return ans;
};
