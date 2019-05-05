/**
 * 
 * @param {string} str 
 */
function FirstNotRepeatingChar(str) {
    // write code here
    if (!str) return -1;
    let data = str.split("");
    let hash = {};
    let N = data.length;
    for (let i = 0; i < N; i++) {
        let value = data[i];
        if (hash[value]) {
            hash[value].time++;
        }
        else {
            // index 保存该字符第一次出现的位置
            hash[value] = {
                time: 1,
                index: i
            }
        }
    }
    for (key in hash) {
        if (hash[key].time === 1) return hash[key].index;
    }
    return -1;
}
