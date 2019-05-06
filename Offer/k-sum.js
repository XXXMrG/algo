/**
 * 
 * @param {number} sum 
 */
function FindContinuousSequence(sum) {
    // write code here
    if (sum < 3) return [];
    let small = 1;
    let big = 2;
    let end = parseInt(sum / 2, 10);
    let now = small + big;
    let result = [];
    while (small <= end) {
        if (now === sum) {
            result.push(createArr(small, big));
            big++;
            now += big;
        }
        else if (now < sum) {
            big++;
            now += big;
        } 
        else {
            now -= small;
            small++;
        }
    }
    return result;
    function createArr (start, end) {
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }
}

console.log(FindContinuousSequence(9));

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    if (!nums || nums.length === 0) return 0;
    let N = nums.length;
    // 子序列之和 : 子序列出现的次数
    let hash = {};
    // 表示前面存在一个和为 0 的子数组
    hash[0] = 1;
    let result = 0;
    // 当前数组和
    let sum = 0;
    for (let i = 0; i < N; i++) {
        // 到第 i 个元素的连续序列和
        sum += nums[i];
        // key 代表着需要从前面去掉多少来构成和为 k 的连续子序列
        let key = sum - k;
        if (hash[key] !== undefined) {
            // 前置子序列可能不为一个，存在元素为 0 的情况，会产生两个和相等的子序列
            result += hash[key];
        }
        // 将子序列保存在 hash 中
        hash[sum] ? hash[sum]++ : hash[sum] = 1;
    }
    return result;
};

//console.log(subarraySum([1,2,3,0], 3));