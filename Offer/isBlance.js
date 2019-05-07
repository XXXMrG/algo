/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
// 递归解法，与求深度思路差不多
function IsBalanced_Solution(pRoot) {
    if (pRoot === null) {
        return true;
    }
    let result = true;
    judge(pRoot);
    function judge (node) {
        let left = 0;
        let right = 0;
        if (node.left) {
            left = judge(node.left);
        }
        if (node.right) {
            right = judge(node.right);
        }
        if (Math.abs(left - right) > 1) {
            result = false;
        }
        return Math.max(left, right) + 1;
    }
    return result;
}

console.log(
    IsBalanced_Solution({
        val: 1,
        left: null,
        right: null
    })
);