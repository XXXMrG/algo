/***
 * chap 1.5
 * union-find problem
 * created in 2018/02/10
 * by keith
 */
package ch_1;

import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class UF {
    private int[] id;
    private int count;
    private int[] sz; //各个根结点所对应的分量大小
    // 采用数组作为表示链接的数据结构，初始化数组
    public UF(int N){
        count = N;
        id = new int[N];
        sz = new int[N];
        for (int i = 0; i < N; i++){
            id[i] = i;
            sz[i] = 1;
        }
    }

    public int count(){
        return count;
    }

    public boolean connected(int p, int q){
        return find(p) == find(q);
    }

//    // solution 1 quick-find
//    public int find(int p){
//        return id[p];
//    }
//
//    public void union(int p, int q){
//        int pID = find(p);
//        int qID = find(q);
//        if(pID == qID)
//            return;
//        for(int i = 0; i < id.length; i++){
//            if(id[i] == pID){
//                id[i] = qID;
//            }
//        }
//        count--;
//    }

    // solution 2 quick-union
    public int find(int p) {
        while(p != id[p])
            p = id[p];
        return p;
    }

//    public void union(int p, int q){
//        int pRoot = find(p);
//        int qRoot = find(q);
//        if(pRoot == qRoot)
//            return;
//        id[pRoot] = qRoot;
//        count--;
//    }

    // solution 3 union-find with weight
    public void union(int p, int q){
        int i = find(p);
        int j = find(q);
        if(i == j )
            return;
        if(sz[i] < sz[j]){
            // 将小树接到大树的根结点
            id[i] = j;
            sz[j] += sz[i];
        }else {
            id[j] = i;
            sz[j] += sz[i];
        }

        count--;
    }

    public static void main(String[] args){
        int N = StdIn.readInt();
        UF uf = new UF(N);
        while(!StdIn.isEmpty()){
            int p = StdIn.readInt();
            int q = StdIn.readInt();
            if(uf.connected(p, q)){
                continue;
            }
            uf.union(p, q);
            StdOut.println(p + " " + q);
        }
        StdOut.println(uf.count + " components");
    }


}
