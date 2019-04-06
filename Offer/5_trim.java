public class Solution {
    public String replaceSpace(StringBuffer str) {
        int count = 0;
        int old = str.length();
        for (int i = 0; i < old; i++) {
            if (str.charAt(i) == ' ')
                count++;
        }
        int L = old + count * 2;
        char[] newCh = new char[L];
        for (int i = 0; i < old; i++) {
            newCh[i] = str.charAt(i);
        }
        old--;
        L--;
        // L <= old 时替换完毕
        while (old >= 0 && L > old) {
            if (newCh[old] == ' ') {
                newCh[L--] = '0';
                newCh[L--] = '2';
                newCh[L--] = '%';
                old--;
            } else {
                newCh[L--] = newCh[old--];
            }
        }
        return new String(newCh);
    }
}