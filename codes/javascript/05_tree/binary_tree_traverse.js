

// 二叉树的前序遍历

import { buildBinaryTree } from "./definition.js";

// 递归写法
const preorderTraversal = function(root) {
    const res = [];

    const traversal = function(root) {
        if (!root) return;
        
        res.push(root.val);
        traversal(root.left);
        traversal(root.right);
    }

    traversal(root);

    return res;
};

// 迭代写法
const preorderTraversal1 = function(root) {
    const res = [];
    const stack = [root];

    while (stack.length > 0) {
        const node = stack.pop();
        res.push(node.val);
        if (node.right) {
            stack.push(node.right);
        }
        if (node.left) {
            stack.push(node.left);
        }
    }

    return res;
}

// 中序遍历
// 递归写法
const inorderTraversal = function(root) {
    const res = [];
    
    const traversal = function(node) {
        if (!node) return;

        traversal(node.left);
        res.push(node.val);
        traversal(node.right);
    }

    traversal(root);

    return res;
};

// 迭代写法

const inorderTraversal1 = function(root) {
    const res = [];
    
    const stack = [];
    let cur = root;
    

    while (stack.length || cur) {
        while (cur) {
            stack.push(cur);
            cur = cur.left;
        }
        const node = stack.pop();
        res.push(node.val);
        cur = node.right;
    }

    return res;
};

// 后续遍历
// 递归写法
const postorderTraversal = function(root) {
    const res = [];

    const traversal = function(node) {
        if (!node) return;
        
        traversal(node.left);
        traversal(node.right);
        res.push(node.val);
    }

    traversal(root);

    return res;
};

// 迭代写法
const postorderTraversal1 = function(root) {
    const res = [];

    const stack = [];
    let cur = root;
    let pre = null;

    while (stack.length || cur) {
        while(cur) {
            stack.push(cur);
            cur = cur.left;
        }

        const node = stack.pop();

        if (!node.right || node.right === pre) { // 右子树为空或者已访问
            res.push(node.val);
            pre = node;
            cur = null;
            continue;
        }

        stack.push(node);
        cur = node.right;
    }

    return res;
};

const levelOrder = function(root) {
    const res = [];

    const queue = root ? [root] : [];

    while(queue.length > 0) {
        let n = queue.length;
        const tmp = [];
        for (let i = 0; i < n; i++ ) {
            const node = queue.shift();
            tmp.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        res.push(tmp);
    }

   return res;
};

function main(){
    const nodes = [3,9,20,null,null,15,7];
    const root = buildBinaryTree(nodes);
    console.log(levelOrder(root));
}

main();


