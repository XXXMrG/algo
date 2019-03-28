import java.util.*;

public class Main {
    public static void main(String[] args) {
        long m = 0;
        long n = 0;
        long res = 0;
        int count = -1;
        Scanner scan = new Scanner(System.in);
        while (scan.hasNextInt()) {
            m = scan.nextInt();
            n = scan.nextInt();
        }
        for (int i = 1; i < m + 1; i += n) {
            for (int j = i; j < n + i; j++) {
                res += j * count;
            }
            count = -count;
        }
        System.out.println(res);
    }
}