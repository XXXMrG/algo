/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function TreeDepth(pRoot) {
    // write code here
    if (!pRoot) return 0;
    return core(pRoot);
    // 没错，无敌递归
    function core (node) {
        if (node === null) {
            return 0;
        }
        let count = 1;
        let left = core(node.left);
        let right = core(node.right);
        count += Math.max(left, right);
        return count;
    }
}

console.log(TreeDepth({
    val: 1,
    left: {
        val: 2,
        left: null,
        right: null
    },
    right: null
}))

