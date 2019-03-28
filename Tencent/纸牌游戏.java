import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();
        long[] nums = new long[n];
        int index = 0;
        int res = 0;
        while (scan.hasNextInt()) {
            nums[index] = scan.nextInt();
            index++;
        }
        Arrays.sort(nums);
        for (int k = n - 1; k > 0; k -= 2) {
            res += nums[k] - nums[k - 1];
        }
        if (n % 2 != 0) {
            res += nums[0];
        }
        System.out.println(res);
    }
}