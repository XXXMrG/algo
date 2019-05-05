/**
 * 
 * @param {number} index 
 */
function GetUglyNumber_Solution(index) {
    if (index === 0) {
        return 0;
    }
    var uglyArr = [1],
        two = 0,
        three = 0,
        five = 0;
    for (let i = 1; i < index; i++) {
        uglyArr[i] = Math.min(
            uglyArr[two] * 2,
            uglyArr[three] * 3,
            uglyArr[five] * 5
        );
        if (uglyArr[i] == uglyArr[two] * 2) {
            two++;
        }
        if (uglyArr[i] == uglyArr[three] * 3) {
            three++;
        }
        if (uglyArr[i] == uglyArr[five] * 5) {
            five++;
        }
    }
    return uglyArr[index - 1];
}
