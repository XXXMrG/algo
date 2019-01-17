/**
 * chap 1.4
 * 2-sum and 3-sum
 * faster method
 */

package ch_1;

import algo1.BinarySearch;
import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;

import java.util.Arrays;

public class NumSum {
    public static int count(int[] a){
        Arrays.sort(a);
        int N = a.length;
        int cnt = 0;
        for(int i = 0; i < N; i++)
            for(int j = i + 1; j < N; j++){
                if(BinarySearch.rank(-a[i] - a[j], a) > j){
                    cnt++;
                }
            }
        return cnt;
    }

//    public static void main(String[] args){
//        int[] a = In.readInts(args[0]);
//        Stopwatch timer = new Stopwatch();
//        int res = count(a);
//        double time = timer.elapsedTime();
//        StdOut.println(res + "used time: " + time);
//    }

}

class DoublingTest_2{
    public static double timeTrial(int N){
        int MAX = 1000000;
        int[] a = new int[N];
        for (int i = 0; i < N; i++){
            a[i] = StdRandom.uniform(-MAX, MAX);
        }
        Stopwatch timer = new Stopwatch();
        int cnt = NumSum.count(a);
        return timer.elapsedTime();
    }
    // 倍率实验
    public static void main(String[] args){
        double prev = timeTrial(125);
        for(int N = 250; true; N += N){
            double time = timeTrial(N);
            StdOut.printf("%6d %7.1f", N, time);
            StdOut.printf("%5.1f\n", time/prev);
            prev = time;
        }
    }
}
