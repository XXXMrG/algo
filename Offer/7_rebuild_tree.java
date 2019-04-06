/**
 * Definition for binary tree 
 * public class TreeNode
 * {   int val; TreeNode left;
 *     TreeNode right; 
 *     TreeNode(int x) { val = x; } 
 * }
 */
public class Solution {
    public TreeNode reConstructBinaryTree(int[] pre, int[] in) {
        if (pre.length == 0) {
            return null;
        }
        int root_val = pre[0];
        TreeNode root = new TreeNode(root_val);
        int pos = 0;
        for (int i = 0; i < in.length; i++) {
            if (in[i] == root_val) {
                pos = i;
                break;
            }
        }
        int[] leftIn = new int[pos];
        int[] rightIn = new int[in.length - pos - 1];
        int now = 0;
        if (leftIn.length != 0) {
            for (int i = 0; i < pos; i++) {
                leftIn[i] = in[now];
                now++;
            }
        }
        now++;
        if (rightIn.length != 0) {
            for (int i = 0; i < rightIn.length; i++) {
                rightIn[i] = in[now];
                now++;
            }
        }
        now = 1;
        int[] leftPre = new int[pos];
        int[] rightPre = new int[in.length - pos - 1];
        if (leftIn.length != 0) {
            for (int i = 0; i < pos; i++) {
                leftPre[i] = pre[now];
                now++;
            }
        }
        if (rightPre.length != 0) {
            for (int i = 0; i < rightPre.length; i++) {
                rightPre[i] = pre[now];
                now++;
            }
        }
        root.left = reConstructBinaryTree(leftPre, leftIn);
        root.right = reConstructBinaryTree(rightPre, rightIn);
        return root;
    }
}