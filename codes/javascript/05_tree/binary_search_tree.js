import { buildBinaryTree, TreeNode } from "./definition";

// 二叉搜索树中的搜索

const searchBST = function(root, val) {
    if (!root) return null;

    if (root.val === val) return root;

    if (root.val > val) return searchBST(root.left, val);
    else return searchBST(root.right, val);
    
};


// 插入节点
const insertIntoBST = function(root, val) {
    if (!root) return new TreeNode(val);

    if (root.val > val) { // 插在左子树
        root.left = insertIntoBST(root.left, val);
    }
    else {
        root.right = insertIntoBST(root.right, val);
    }

    return root;
};

// 删除节点
const deleteNode = function(root, key) {
    // 边界处理 xxx
    if (!root) return null;

    if (root.val === key) {
        if (!root.left) return root.right;
        if (!root.right) return root.left;

        let curNode = root.right;
        while (curNode.left) {
            curNode = curNode.left;
        }

        root.val = curNode.val;
        root.right = deleteNode(root.right, curNode.val);
    }

    else if (root.val > key) { // 在左子树删除
        root.left = deleteNode(root.left, key);
    }
    else {
        root.right = deleteNode(root.right, key);
    }

    return root;
};

// 验证二叉搜索树
const isValidBST = function(root) {
    
    const check = function(node, minVal, maxVal) {
        if (!node) return true;

        if (node.val <= minVal || node.val >= maxVal) {
            return false;
        }

        return check(node.left, minVal, node.val) &&
                check(node.right, node.val, maxVal);
    }

    return check(root, -Infinity, Infinity);
};

// 将有序数组转换为二叉搜索树
const sortedArrayToBST = function(nums) {
    const n = nums.length;

    const toBST = function(begin, end) {
        if (begin > end) return null;
        
        const idx = begin + ((end - begin) >> 1); // 防溢出
        const node = new TreeNode(nums[idx]);

        node.left = toBST(begin, idx - 1);
        node.right = toBST(idx + 1, end);

        return node;
    }

    return toBST(0, n - 1);
};

// 二叉搜索树的最近公共祖先
const lowestCommonAncestor = function(root, p, q) {
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestor(root.left, p, q);
    }
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestor(root.right, p, q);
    }
    return root;
};

// 迭代写法
const lowestCommonAncestor1 = function(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;
        } else {
            
        return root;
        }
    }

    return null;
};

function main() {
    const nums = [6,2,8,0,4,7,9,null,null,3,5];
    const p = 2, q = 8;
}