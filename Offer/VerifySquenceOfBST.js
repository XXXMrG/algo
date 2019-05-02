/**
 * 
 * @param {[]} sequence 
 */
function VerifySquenceOfBST(sequence) {
    // write code here
    if (sequence.length === 0) return false;
    let N = sequence.length;
    let root = sequence[N - 1];
    let low = 0;
    let left = true;
    let right = true;
    // low 是第一个大于 root 的元素
    while (sequence[low] < root) {
        low++;
    }
    // 检查左子树是否都小于根
    for (let i = 0; i < low; i++) {
        if (sequence[i] > root) return false;
    }
    // 检查右子树是否都大于根
    for (let i = low; i < N - 1; i++) {
        if (sequence[i] < root) return false;
    }
    // 存在左子树，递归遍历左子树
    if (low > 0) {
        left = VerifySquenceOfBST(sequence.slice(0, low));
    }
    // 存在右子树，递归遍历右子树
    if (low < N - 1) {
        right = VerifySquenceOfBST(sequence.slice(low, N -1));
    }
    // 只要有不满足条件的，就返回false
    return left && right;
}
