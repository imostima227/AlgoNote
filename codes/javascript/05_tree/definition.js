// 二叉树
export class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// 建立二叉树
export function buildBinaryTree(nodes){
    if (!nodes || nodes.length === 0) {
        return null;
    }

    const root = new TreeNode(nodes[0]);

    const queue = [root];

    let i = 1;

    while (i < nodes.length){
        const cur = queue.shift(); // 当前节点的父节点
        // 左节点
        if (i < nodes.length) {
            if (nodes[i]) {
                const left = new TreeNode(nodes[i]);
                cur.left = left;
                queue.push(left);
            }
            i++;
        }
        // 右节点
        if (i < nodes.length) {
            if (nodes[i]) {
                const right = new TreeNode(nodes[i]);
                cur.right = right;
                queue.push(right);
            }
            i++;
        }
    }
    
    return root
}