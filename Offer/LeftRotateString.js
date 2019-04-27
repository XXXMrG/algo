function LeftRotateString(str, n) {
    // write code here
    if (!str) return "";
    let N = str.length;
    n = n % N;
    let result = reverseString(str.slice(0, n)) + reverseString(str.slice(n));
    return reverseString(result);
}
function reverseString (str) {
    return str.split("").reverse().join("");
}

let str = "abcXYCdef";
console.log(LeftRotateString(null, 2));