// 二叉搜索树中的搜索

const searchBST = function(root, val) {
    if (!root) return null;

    if (root.val === val) return root;

    if (root.val > val) return searchBST(root.left, val);
    else return searchBST(root.right, val);
    
};

const insertIntoBST = function(root, val) {
    
};