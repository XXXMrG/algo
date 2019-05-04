/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot) {
    // write code here
    if (!pRoot) return true;
    let originalTree = [];
    let stack = [];
    let mirrorTree = [];
    function original (node) {
        if (node === null) {
            originalTree.push("#");
            return;
        }
        originalTree.push(node.val);
        original(node.left);
        original(node.right);
    }

    function mirror (node) {
        stack.push(node);
        while (stack.length !== 0) {
            let now = stack.pop();
            if (!now) {
                mirrorTree.push("#");
            } else {
                mirrorTree.push(node.val);
                stack.push(now.left);
                stack.push(node.right);
            }
        }
    }
    original(pRoot);
    mirror(pRoot);
    return originalTree.toString() === mirrorTree.toString();
}

function isSymmetrical(pRoot) {
    if (!pRoot) return true;
    return judge(pRoot.left, pRoot.right);
    function judge(left, right) {
        if (left === null) return right === null;
        if (right === null) return false;
        if (left.val !== right.val) return false;
        return judge(left.left, right.right) && judge(left.right, right.left);
    }
}

console.log(isSymmetrical({
    val : 1,
    left: null,
    right: null
}));