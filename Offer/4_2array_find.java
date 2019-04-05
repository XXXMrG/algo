/**
 * 二维排序数组查找
 * 从左下角或右上角找
 * 保证可以排除掉一行或者一列
 */

public class Solution {
    public boolean Find(int target, int[][] array) {
        int row = array.length - 1;
        int col = array[0].length - 1;
        int curCol = col;
        int curRow = 0;
        while (curRow <= row && curCol >= 0) {
            if (array[curRow][curCol] == target) {
                return true;
            } else if (array[curRow][curCol] > target) {
                curCol--;
            } else {
                curRow++;
            }
        }
        return false;
    }
}