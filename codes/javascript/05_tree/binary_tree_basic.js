
// 二叉树的最近公共祖先（LCA）
const lowestCommonAncestor = function(root, p, q) {
    const actP = [];
    const actQ = [];

    const dfs = function (node, target) {
        if (!node) return false;

        pushToStack(node, target);

        if (node === target) {
            pushToStack(node, target);
            return true;
        }

        if (dfs(node.left, target)) {
            return true;
        }

        if (dfs(node.right, target)) {
            return true;
        }

        if (target === p) actP.pop();
        else actQ.pop();

        return false;
    }

    const pushToStack = function(node, target) {
        if (target === p) actP.push(node);
        else if (target === q) actQ.push(node);
        return;
    }

    dfs(root, p);
    dfs(root, q);

    let ans = root;
    const n = Math.min(actP.length, actQ.length);

    for (let i = 0; i < n; i++) {
        if (actP[i] === actQ[i]) {
            ans = actP[i];
        }
        else break;
    }

    return ans;
};

// 递归写法
const lowestCommonAncestor1 = function(root, p, q) {
    if (!root || root === p || root === q) return root;

    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root;
    
    return left ? left : right;
}