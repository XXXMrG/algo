function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function Serialize(pRoot) {
    // write code here
    if (!pRoot) return;
    let result = [];
    core(pRoot);
    function core(node) {
        if (node === null) {
            result.push("$");
            return;
        }
        result.push(node.val);
        core(node.left);
        core(node.right);
    }
    return result.toString();
}
function Deserialize(s) {
    // write code here
    if (!s) return null;
    let data = s.split(",");
    return core(data);
    // 理解这个递归，你就能理解大多数递归了
    function core(serial) {
        if (serial.length === 0) return;
        let now = serial.shift();
        if (now === "$") {
            return null;
        }
        let root = new TreeNode(parseInt(now, 10));
        root.left = core(serial);
        root.right = core(serial);
        return root;
    }
}
let data = Deserialize("1,2,4,$,$,$,3,5,$,$,6,$,$");
console.log(Serialize(data));