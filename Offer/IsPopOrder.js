/**
 * 
 * @param {[]} pushV 
 * @param {[]} popV 
 */

function IsPopOrder(pushV, popV) {
    // write code here
    if (!pushV || !popV) return false;
    let stack = [];
    let N = popV.length;
    for (let i = 0; i < N; i++) {
        while (top(stack) !== popV[i]) {
            // 如果入栈序列以空还未结束，说明序列不对
            if (pushV.length === 0) return false;
            let now = pushV.shift();
            stack.push(now);
        }
        stack.pop();
    }
    // 只要能够全部走完循环就说明序列正确
    return true;
    function top (array) {
        return array[array.length - 1];
    }
}

console.log(IsPopOrder([1,2,3,4,5], [4,3,5,1,2]));