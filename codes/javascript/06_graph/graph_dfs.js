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