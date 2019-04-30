let stack = [];
let minStack = [];
let minData = Infinity;
function push(node) {
    // write code here
    stack.push(node);
    if (node < minData) {
        minData = node;
    } 
    minStack.push(minData);
}
function pop() {
    // write code here
    if (stack.length !== 0) {
        minStack.pop();
        return stack.pop();
    }
    return null;
}
function top() {
    // write code here
    if (stack.length !== 0) {
        return stack[0];
    }
    return null;
}
function min() {
    // write code here
    if (stack.length !== 0) {
        let index = minStack.length - 1;
        return minStack[index];
    }
    return null;
}

push(1);
push(2);
push(0);
console.log(stack);
console.log(minStack);
console.log(min());
