/**
 * 
 * @param {[]} array 
 */
function FindGreatestSumOfSubArray(array) {
    // 保存了局部最优解和全局最优解的方法
    let N = array.length;
    let local = array[0];
    let global = array[0];
    for (let i = 1; i < N; i++) {
        local = Math.max(array[i], array[i] + local);
        global = Math.max(local, global);
    }
    return global;
}

function FindGreatestSumOfSubArray(array) {
    // 保存了整个 dp 序列的方法
    let N = array.length;
    let dp = [];
    dp[0] = array[0];
    let max = dp[0];
    for (let i = 0; i < N; i++) {
        dp[i] = array[i] + (dp[i-1] > 0 ? dp[i-1] : 0);
        max = Math.max(dp[i], max);
    }
    return max;
}
