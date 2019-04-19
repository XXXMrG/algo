/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead) {
    // 找到一个环内的节点
    function findMeet() {
        if (pHead === null) return null;
        let pSlow = pHead.next;
        if (pSlow === null) return null;
        let pFast = pSlow.next;
        while (pFast !== null && pSlow !== null) {
            if (pFast === pSlow) {
                return pFast;
            }
            pSlow = pSlow.next;
            pFast = pFast.next;
            if (pFast === null) return null;
            pFast = pFast.next;
        }
    }
    let cur = findMeet();
    if (cur === null) return null;
    let pNode = cur.next;
    let count = 1;
    // 计算环中节点个数
    while (pNode !== cur) {
        count ++;
        pNode = pNode.next;
    }
    pNode = pHead;
    cur = pHead;
    // 第一个指针先走 count 步
    for (let i = 0; i < count; i++) {
        cur = cur.next;
    }
    // 相遇的时候就是环节点的入口
    while (pNode !== cur) {
        pNode = pNode.next;
        cur = cur.next;
    }
    return pNode;
}
