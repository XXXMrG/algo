
import java.util.*;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class huawei_02 {
    public static void main(String[] args) {
        String reg = "[^0-9a-zA-Z]";
        Pattern r = Pattern.compile(reg);
        int N = 10;
        String[] str = { "abc", "def", "===", "123", "123ijf*", "123", "ZFasdasdZ" };
        ArrayList<String> right = new ArrayList<>();
        ArrayList<String> wrong = new ArrayList<>();
        for (String s : str) {
            Matcher macher = r.matcher(s);
            if (macher.find()) {
                wrong.add(s);
            } else {
                right.add(s);
            }
        }
        // 1.输出合法去重序列
        HashSet<String> set = new HashSet<>();
        ArrayList<String> newRight = new ArrayList<>();
        for (String s : right) {
            if (set.add(s)) {
                newRight.add(s);
            }
        }
        for (String s : newRight) {
            System.out.print(s + " ");
        }
        System.out.println();
        // 2.输出非法序列
        for (String s : wrong) {
            System.out.print(s + " ");
        }
        System.out.println();
        // 3.输出合法字符串旋转10位后的序列
        ArrayList<String> rolledRight = new ArrayList<>();
        for (String s : newRight) {
            rolledRight.add(roll(s, N));
        }
        for (String s : rolledRight) {
            System.out.print(s + " ");
        }
        System.out.println();
        // 4.输出第三步序列的 ACSII 排序序列
        Collections.sort(rolledRight);
        for (String s : rolledRight) {
            System.out.print(s + " ");
        }
        System.out.println();

    }

    public static String roll(String s, int N) {
        int pos = N % s.length();
        StringBuffer str = new StringBuffer(s);
        StringBuffer left = new StringBuffer(str.substring(0, pos)).reverse();
        StringBuffer right = new StringBuffer(str.substring(pos, str.length())).reverse();
        str = left.append(right);
        str = str.reverse();
        return new String(str);
    }
}
