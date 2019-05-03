/**
 * 
 * @param {string} str 
 */
function Permutation(str) {
    // write code 
    if (!str) return [];
    // 用 set 直接去重
    let result = new Set();
    let N = str.length;
    let array = str.split("");
    core(array, 0);
    function core (array, begin) {
        // 指针走到头，说明找到了一个序列
        if (begin === N) {
            result.add(array.join(""));
        }
        else {
            // 每一次都会先与本身交换，因此会包含元字符串排列
            for (let i = begin; i < N; i++) {
                // 与第一个交换
                [array[begin], array[i]] = [array[i], array[begin]];
                // 固定第一个位置，进入递归
                core(array, begin + 1);
                // 递归后要恢复原来的排列，不然会错乱
                [array[i], array[begin]] = [array[begin], array[i]];
            }
        }
    }
    // 用迭代器展开并按照字典序排列
    return [...result].sort();
}
