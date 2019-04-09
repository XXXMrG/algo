public class Solution {
    public int RectCover(int target) {
        if (target <= 0){
            return 0;
        }
        if (target == 1){
            return 1;
        }
        if (target == 2){
            return 2;
        }
        int one = 1;
        int two = 2;
        int res = 0;
        for(int i = 3; i <= target; i++){
            res = one + two;
            one = two;
            two = res;
        }
        return res;
    }
}