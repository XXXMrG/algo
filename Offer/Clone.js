function RandomListNode(x){
    this.label = x;
    this.next = null;
    this.random = null;
}

function Clone(pHead) {
    // write code here
    if (!pHead) return null;
    doubleLink(pHead);
    copy(pHead);
    return partition(pHead);
    // 复制每一个节点到自己后边
    function doubleLink (pHead) {
        let node = pHead;
        let newNode = null;
        while (node !== null) {
            newNode = new RandomListNode(node.label);
            newNode.next = node.next;
            node.next = newNode;
            node = newNode.next;
        }
        return pHead;
    }
    // 复制每个节点的 random
    function copy (pHead) {
        let node = pHead;
        while (node !== null) {
            // 考虑 random 为空的情况
            node.next.random = node.random && node.random.next;
            node = node.next.next;
        }
        return pHead;
    }

    function partition (pHead) {
        let newHead;
        let node = pHead;
        newHead = pHead.next;
        // 节点交叉赋值来实现链表拆分
        while (node.next !== null) {
            let temp = node.next;
            node.next = temp.next;
            node = temp;
        }
        return newHead;
    }
}

let data = new RandomListNode(1);
let data1 = new RandomListNode(2);
data.next = data1;
data.random = data1;

console.log(Clone(data));
console.log(data);
