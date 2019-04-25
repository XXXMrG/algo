/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2) {
    let result = false;
    if (pRoot1 !== null && pRoot2 !== null) {
        if (pRoot1.val === pRoot2.val) {
            result = findDeep(pRoot1, pRoot2);
        }
        if (!result) {
            result = HasSubtree(pRoot1.left, pRoot2);
        }
        if (!result) {
            result = HasSubtree(pRoot1.right, pRoot2);
        }
    }
    return result;
    function findDeep(pRoot1, pRoot2) {
        if (pRoot2 === null) return true;
        if (pRoot1 === null) return false;
        if (pRoot1.val !== pRoot2.val) return false;
        return findDeep(pRoot1.left, pRoot2.left) && findDeep(pRoot1.right, pRoot2.right);
    }
}
