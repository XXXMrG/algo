package ch_1;

import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

import java.util.Iterator;

public class Main_test {
    public static void main(String[] args){
        Queue <String> q = new Queue<>();
        while(!StdIn.isEmpty()){
            String item = StdIn.readString();
            if(!item.equals("-")){
                q.enqueue(item);
            }
            else if(!q.isEmpty()){
                StdOut.print(q.dequeue() + " ");
            }
        }
        StdOut.println("(" + q.size() + "left on the stack )");

        Iterator<String> iterator = q.iterator();
        while(iterator.hasNext()){
            String s = iterator.next();
            StdOut.println(s);
        }
    }
}
