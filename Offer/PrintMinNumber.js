/**
 * 
 * @param {[]} numbers 
 */
function PrintMinNumber(numbers) {
    // write code here
    if (!numbers) return [];
    let data = numbers.toLocaleString().split(",");
    data = data.sort((a, b) => {
        return (a + b) - (b + a);
    })
    return data.join("");
}

function PrintMinNumber(numbers) {
    let minNum = numbers.sort(function(a, b) {
        return [a, b].join("") - [b, a].join("");
    });
    return minNum.join("");
}

let data = [3,5,1,4,2]
console.log(PrintMinNumber(data));

