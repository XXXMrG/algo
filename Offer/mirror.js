/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Mirror(root) {
    // write code here
    if (root === null) return null;
    let stack = [];
    stack.push(root);
    while (stack.length !== 0) {
        let now = stack.pop();
        [now.left, now.right] = [now.right, now.left];
        now.right && stack.push(right);
        now.left && stack.push(now.left);
    }
    return root;
}

// 递归版本

function Mirror(root) {
    // write code here
    if (root === null) return null;
    [root.left, root.right] = [root.right, root.left];
    Mirror(root.left);
    Mirror(root.right);
    return root;
}
