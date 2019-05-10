/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function KthNode(pRoot, k) {
    // write code here
    if (!pRoot) return;
    let stack = [];
    let count = 0;
    let node = pRoot;
    // 非递归中序遍历找第 k 个
    while (node !== null || stack.length !== 0) {
        if (node !== null) {
            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop();
            count++;
            if (count === k) {
                return node;
            }
            node = node.right;
        }
    }
}