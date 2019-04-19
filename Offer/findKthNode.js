/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function FindKthToTail(head, k) {
    // write code here
    if (head === null || k === 0) return null;
    let cur = head;
    let end = head;
    // 间隔 k - 1 个位置
    for (let i = 1; i < k; i++) {
        if (end.next !== null) {
            end = end.next;
        } else {
            return null;
        }
    }
    while (end.next !== null) {
        cur = cur.next;
        end = end.next;
    }
    return cur;
}
