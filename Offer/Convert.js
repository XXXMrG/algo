/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Convert(pRootOfTree) {
    // write code here
    if (!pRootOfTree) return null;
    // 这里将 pLast 设置为全局变量，为了让递归的过程中指针不乱
    let pLast = null;
    core(pRootOfTree, pLast);
    let pHead = pLast;
    while (pHead !== null && pHead.left !== null) {
        pHead = pHead.left;
    }
    return pHead;
    function core (root) {
        if (root === null) return;
        let node = root;
        // 递归左子树
        node.left && core(node.left, pLast);
        // 当前节点的左节点设置为上一个最大的节点
        node.left = pLast;
        // 上一个最大节点的右边设置为当前节点
        if (pLast !== null) {
            pLast.right = node;
        }
        pLast = node;
        // 递归右子树
        node.right && core(node.right, pLast);
    }
}
