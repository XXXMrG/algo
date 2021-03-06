package algo1;

import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

import java.util.Scanner;
import java.util.Stack;

public class Evaluate {
    public static void main(String[] args){
        Stack<String> ops = new Stack<>();
        Stack<Double> vals = new Stack<>();
        // 回车并不能直接触发 isEmpty 因此使用 command + d 或者改用 Scanner
        Scanner scanner = new Scanner(System.in);
        while(!StdIn.isEmpty()){
            String s = StdIn.readString();

            if(s.equals("("));
            else if (s.equals("+"))
                ops.push(s);
            else if (s.equals("-"))
                ops.push(s);
            else if (s.equals("*"))
                ops.push(s);
            else if (s.equals("/"))
                ops.push(s);
            else if (s.equals("sqrt"))
                ops.push(s);
            else if (s.equals(")")){
                String op = ops.pop();
                double v = vals.pop();
                if (op.equals("+"))
                    v = vals.pop() + v;
                else if (op.equals("-"))
                    v = vals.pop() - v;
                else if (op.equals("*"))
                    v = vals.pop() * v;
                else if (op.equals("/"))
                    v = vals.pop() / v;
                else if (op.equals("sqrt"))
                    v = Math.sqrt(v);
                vals.push(v);
            }
            else{
                vals.push(Double.parseDouble(s));
            }
        }
        StdOut.println(vals.pop());
    }
}
