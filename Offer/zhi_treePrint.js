/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function Print(pRoot) {
    // write code here
    let result = [];
    let stack = [];
    if (pRoot === null) return [];
    stack.push(pRoot);
    let left = false;
    while (stack.length !== 0) {
        let res = [];
        left = !left;
        let dSize = stack.length;
        while (dSize !== 0) {
            let now = stack.shift();
            // 奇数从左到右塞，偶数从右到左塞
            left ? res.push(now.val) : res.unshift(now.val);
            now.left && stack.push(now.left);
            now.right && stack.push(now.right);
            dSize--;
        }
        result.push(res);
    }
    return result;
}

