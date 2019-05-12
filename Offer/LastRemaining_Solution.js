/**
 * 
 * @param {number} n 
 * @param {number} m 
 */

function LastRemaining_Solution(n, m) {
    // write code here
    if (n < 1 || m < 1){
        return;
    }
    let last = 0;
    for (let i = 2; i <= n; i++) {
        last = (last + m) % i;
    }
    return last;
}
