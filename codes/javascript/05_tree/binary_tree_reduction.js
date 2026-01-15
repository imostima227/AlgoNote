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

function main() {
    const preorder = [3,9,20,15,7];
    const inorder = [9,3,15,20,7];


}

main()
