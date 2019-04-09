public class Solution {
    public int JumpFloor(int target) {
        if (target == 1)
            return 1;
        if (target == 2)
            return 2;
        return JumpFloor(target - 1) + JumpFloor(target - 2);
    }

    public int JumpFloorII(int target) {
        return (int) Math.pow(2, target - 1);
    }
}