import { TreeNode } from "./definition";

// 从前序与中序遍历构造二叉树
const buildTree = function(preorder, inorder) {
    
    const build = function(preorder, inorder, n) {
        if (!n) return null;

        let k = 0; 
        while (inorder[k] != preorder[0]) k++;
        
        const node = new TreeNode(inorder[k]);
        
        node.left = build(preorder.slice(1, k + 1), inorder.slice(0, k), k);
        node.right = build(preorder.slice(k + 1, n), inorder.slice(k + 1, n), n - k - 1);

        return node;
    }

    return build(preorder, inorder, inorder.length);
};

// 优化后版本
const buildTree1 = function(preorder, inorder) {
    const map = new Map();

    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }

    const build = function(preBegin, preEnd, inBegin, inEnd) {
        if (preBegin > preEnd) return null;
        
        const rootIdx = map.get(preorder[preBegin]); // 当前根节点的中序序号

        const node = new TreeNode(inorder[rootIdx]);

        // 构建左右子树
        node.left = build(preBegin + 1,  preBegin + rootIdx - inBegin, inBegin, rootIdx - 1);
        node.right = build(preBegin + 1 + rootIdx - inBegin, preEnd, rootIdx + 1, inEnd);

        return node;
    }

    return build(0, preorder.length - 1, 0, inorder.length - 1);
};

// 从中序与后续遍历序列构造二叉树
const buildTree_2 = function(inorder, postorder) {
    const map = new Map();

    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }

    const build = function(inBegin, inEnd, postBegin, postEnd) {
        if (postBegin > postEnd) return null; // 等下想一下

        const rootIdx = map.get(postorder[postEnd]);
        const leftLen = rootIdx - inBegin;

        const node = new TreeNode(inorder[rootIdx]);

        node.left = build(inBegin, rootIdx - 1, postBegin, postBegin + leftLen - 1);
        node.right = build(rootIdx + 1, inEnd, postBegin + leftLen, postEnd - 1);

        return node;
    }

    return build(0, inorder.length - 1, 0, postorder.length - 1);
};

const constructFromPrePost = function(preorder, postorder) {
    const map = new Map();

    for (let i = 0; i < postorder.length; i++) {
        map.set(postorder[i], i);
    }

    const build = function(preBegin, preEnd, postBegin, postEnd) {
        if (preBegin > preEnd) return null;

        const node = new TreeNode(preorder[preBegin]); // 根节点

        if (preBegin === preEnd) return node; // 叶子节点直接返回，避免数组越界

        const postLeftRootIdx = map.get(preorder[preBegin + 1]);

        const rightLen = postEnd - postLeftRootIdx - 1;

        node.left = build(preBegin + 1, preEnd - rightLen, postBegin, postEnd - rightLen - 1);
        node.right = build(preEnd - rightLen + 1, preEnd, postEnd - rightLen, postEnd - 1);

        return node;
    }

    return build(0, preorder.length - 1, 0, postorder.length - 1);
};

function main() {
    const preorder = [3,9,20,15,7];
    const inorder = [9,3,15,20,7];


}

main()
