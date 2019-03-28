import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        while (scan.hasNextInt()) {
            int N = scan.nextInt();
            HashMap<Integer, ArrayList<Integer>> map = new HashMap<>();
            for (int i = 0; i < N; i++) {
                int k = scan.nextInt();
                if (map.containsKey(k)) {
                    map.get(k).add(i);
                } else {
                    ArrayList<Integer> list = new ArrayList<>();
                    list.add(i);
                    map.put(k, list);
                }
            }
            int K = scan.nextInt();
            for (int i = 0; i < K; i++) {
                int start = scan.nextInt();
                int end = scan.nextInt();
                int target = scan.nextInt();
                int count = 0;
                if (map.containsKey(target)) {
                    for (int s : map.get(target)) {
                        if (s >= start - 1 && s < end) {
                            count++;
                        }
                    }
                }
                System.out.println(count);
            }
        }
    }
}