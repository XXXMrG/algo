/**
 * 
 * @param {[]} array 
 */
function FindNumsAppearOnce(array) {
    // write code here
    // return list, 比如[a,b]，其中ab是出现一次的两个数字
    // 也可以使用位运算结合 XOR 来求，不过 JavaScript 的位操作很麻烦，同时效率也有待商榷。
    // 这里我们用 hash 表来解，较为直观，不用额外空间的话可以先排序。
    if (!array) return [];
    let result = [];
    let hash = array.reduce((list, val) => {
        list[val] ? list[val]++ : list[val] = 1;
        return list;
    }, {})
    for (key in hash) {
        if (hash[key] === 1) {
            result.push(key);
        }
    }
    return result;
}

let data = [2, 4, 6, 3, 3, 2, 5, 5];

console.log(FindNumsAppearOnce(data));
