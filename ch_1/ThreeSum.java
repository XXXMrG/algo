/**
 * chap 1.4
 * 算法分析
 * 用于算法分析的几个例子
 */


package ch_1;

import edu.princeton.cs.algs4.In;
import edu.princeton.cs.algs4.StdOut;
import edu.princeton.cs.algs4.StdRandom;

public class ThreeSum {
    public static int count(int[] a){
        int N = a.length;
        int cnt = 0;
        for(int i = 0; i < N; i++)
            for(int j = i + 1; j < N; j++)
                for(int k = j + 1; k < N; k++)
                    if(a[i] + a[j] + a[k] == 0){
                        cnt++;
                    }
        return cnt;
    }

//    public static void main(String[] args){
//        int[] a = In.readInts(args[0]);
//        int res = 0;
//        Stopwatch timer = new Stopwatch();
//        res = count(a);
//        double time = timer.elapsedTime();
//        StdOut.println(res + "\n used time: " + time);
//    }
}

// a time counter
class Stopwatch{
    private final long start;
    public Stopwatch(){
        start = System.currentTimeMillis();
    }

    public double elapsedTime(){
        long now = System.currentTimeMillis();
        return (now - start) / 1000.0;
    }

}

class DoublingTest{
    public static double timeTrial(int N){
        int MAX = 1000000;
        int[] a = new int[N];
        for (int i = 0; i < N; i++){
            a[i] = StdRandom.uniform(-MAX, MAX);
        }
        Stopwatch timer = new Stopwatch();
        int cnt = ThreeSum.count(a);
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

