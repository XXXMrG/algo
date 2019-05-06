/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var threeSum = function(arr) {
    let result = []; //储存结果
    //长度不够则return
    if (arr.length < 3) return [];
    //数组先排序
    arr.sort((x, y) => {
        return x - y;
    });
    let N = arr.length;
    //循环判断数据
    for (let i = 0, len = N; i < len; i++) {
        //如果当前项与前一项相等则跳过，也属于去重的一部分，去重第一个数
        if (i > 0 && arr[i] === arr[i - 1]) continue;
        //判断当前项之和的两数之和是否等于当前项的相反数
        let L = i + 1,
            R = len - 1;
        //当前项必须为负数才继续判断后续项之和
        // 因为数组已经排好序，如果数组大于 0 后面不可能出现可以使得和为 0 的数出现
        if (arr[i] < 1) {
            while (L < R) {
                let sum = arr[L] + arr[R] + arr[i];
                if (sum === 0) {
                    //记录结果
                    result.push([arr[i], arr[L], arr[R]]);
                    //过滤掉重复项
                    do {
                        L++;
                    } while (L < R && arr[L] === arr[L - 1]);
                    do {
                        R--;
                    } while (L < R && arr[R] === arr[R + 1]);
                } else if (sum < 0) {
                    L++;
                } else {
                    R--;
                }
            }
        }
    }
    return result;
};
