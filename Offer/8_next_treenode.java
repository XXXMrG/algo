/*
public class TreeLinkNode {
    int val;
    TreeLinkNode left = null;
    TreeLinkNode right = null;
    TreeLinkNode next = null;

    TreeLinkNode(int val) {
        this.val = val;
    }
}
*/
public class Solution {
    public TreeLinkNode GetNext(TreeLinkNode pNode) {
        TreeLinkNode cur = null;
        if (pNode.right != null) {
            cur = pNode.right;
            while (cur.left != null) {
                cur = cur.left;
            }
            return cur;
        } else if (pNode.next == null) {
            return null;
        } else if (pNode.next.left == pNode) {
            return pNode.next;
        } else {
            cur = pNode.next;
            while (cur.next != null && cur.next.left != cur) {
                cur = cur.next;
            }
            return cur.next;
        }
    }
}