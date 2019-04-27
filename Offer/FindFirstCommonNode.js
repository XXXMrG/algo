/*function ListNode(x){
    this.val = x;
    this.next = null;
    公共结点意味着该节点完全一样，后面的东西也一样的
}*/
function FindFirstCommonNode(pHead1, pHead2) {
    if (pHead1 === null || pHead2 === null) return null;
    let length1 = 1;
    let length2 = 1;
    let p1 = pHead1;
    let p2 = pHead2;
    while (p1 !== null) {
        p1 = p1.next;
        length1++;
    }
    while (p2 !== null) {
        p2 = p2.next;
        length2++;
    }
    p1 = pHead1;
    p2 = pHead2;
    if (length1 >= length2) {
        let dis = length1 - length2;
        if (dis !== 0) {
            for (let i = 0; i < dis; i++) {
                p1 = p1.next;
            }
        }
        while (p1 !== p2) {
            p1 = p1.next;
            p2 = p2.next;
        }
        return p1;
    } else {
        let dis = length2 - length1;
        for (let i = 0; i < dis; i++) {
            p2 = p2.next;
        }
        while (p1 !== p2) {
            p1 = p1.next;
            p2 = p2.next;
        }
        return p1;
    }
}

let data1 = {
    val: 1,
    next: {
        val: 2,
        next: {
            val: 3,
            next: {
                val: 4,
                next: null
            }
        }
    }
}

let data2 = {
    val: 9,
    next: {
        val: 5,
        next: {
            val: 3,
            next: {
                val: 4,
                next: null
            }
        }
    }
};

console.log(FindFirstCommonNode(data1, data2));
