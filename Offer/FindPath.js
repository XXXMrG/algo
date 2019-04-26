/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber) {
    if (root === null) return [];
    // 利用二叉树先序遍历和堆栈解决。
    let result = [];
    let stack = [];
    function Search(node) {
        stack.push(node.val);
        node.left && Search(node.left);
        node.right && Search(node.right);
        if (node.left === null && node.right === null) {
            let sum = stack.reduce((a, b) => {
                return a + b;
            });
            if (sum === expectNumber) {
                result.push(stack.slice());
            }
        }
        stack.pop();
    }
    Search(root);
    return result;
}

let data = {
    val: 10,
    left: {
        val: 5,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 7,
            left: null,
            right: null
        }
    },
    right: {
        val: 12,
        left: null,
        right: null
    }
};

console.log(FindPath(data, 22));
