/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function deleteDuplication(pHead) {
    // write code here
    if (!pHead) return null;
    let pre = null;
    let node = pHead;
    while (node !== null) {
        let pNext = node.next;
        let needDelete = false;
        if (pNext !== null && pNext.val === node.val) {
            needDelete = true;
        }
        if (needDelete) {
            let value = node.val;
            let toBeDel = node;
            // 移动 pNext 到第一个不重复的节点
            while (toBeDel !== null && toBeDel.val === value) {
                pNext = toBeDel.next;
                toBeDel = pNext;
            }
            // 第一个节点重复，直接把节点头换了
            if (pre === null) {
                pHead = pNext;
            }
            // 链接不重复的到前一个节点 
            else {
                pre.next = pNext;
            }
            node = pNext;
        } else {
            pre = node;
            node = node.next;
        }
    }
    return pHead;
}
