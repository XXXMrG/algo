/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root) {
    // write code here
    if (root === null) return [];
    let queue = [];
    let result = [];
    queue.push(root);
    while (queue.length !== 0) {
        let node = queue.shift();
        result.push(node.val);
        node.left && queue.push(node.left);
        node.right && queue.push(node.right);
    }
    return result;
}
