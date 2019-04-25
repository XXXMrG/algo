/**
 * 合并两个递增的链表
 */

/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2) {
    if (pHead1 === null) {
        return pHead2;
    } else if (pHead2 === null) {
        return pHead1;
    }
    let result = null;
    if (pHead1.val <= pHead2.val) {
        result = pHead1;
        result.next = Merge(pHead1.next, pHead2);
    } else {
        result = pHead2;
        result.next = Merge(pHead1, pHead2.next);
    }
    return result;
}

function Merge(pHead1, pHead2) {
    if (pHead1 === null) {
        return pHead2;
    } else if (pHead2 === null) {
        return pHead1;
    }
    let result = null;
    if (pHead1.val <= pHead2.val) {
        result = pHead1;
        pHead1 = pHead1.next;
    } else {
        result = pHead2;
        pHead2 = pHead2.next;
    }
    result.next = null;
    // 设置头指针保存 result 的头，因为 result 是在不断运动的
    let resHead = result;
    while (pHead1 !== null && pHead2 !== null) {
        if (pHead1.val <= pHead2.val) {
            result.next = pHead1;
            pHead1 = pHead1.next;
        } else {
            result.next = pHead2;
            pHead2 = pHead2.next;
        }
        result = result.next;
    }
    if (pHead1 !== null) {
        result.next = pHead1;
    } else if (pHead2 !== null) {
        result.next = pHead2;
    }

    return resHead;
}
