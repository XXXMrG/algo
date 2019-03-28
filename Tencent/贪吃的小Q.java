import java.util.Scanner;

public class Main {
    static int N = 0;
    static int M = 0;

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        N = scan.nextInt();
        M = scan.nextInt();
        System.out.print(fun());
    }

    // 计算第一天吃s个巧克力一共需要多少个多少个巧克力
    public static int sum(int s) {
        int sum = 0;
        for (int i = 0; i < N; i++) {
            sum += s;
            s = (s + 1) / 2;// 向上取整
        }
        return sum;
    }

    // 二分查找
    public static int fun() {
        if (N == 1)
            return M;
        int low = 1;
        int high = M;// 第一天的巧克力一定是大于等于1小于等于m的
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (sum(mid) == M)
                return mid;// 如果第一天吃mid个巧克力，刚刚好吃完所有巧克力，那么直接返回
            else if (sum(mid) < M) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return high;
    }
}