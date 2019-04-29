function FindNumbersWithSum(array, sum) {
    // write code here
    if (!array) return [];
    let N = array.length;
    let hash = {};
    for (let i = 0; i < N; i++) {
        let target = array[i];
        hash[target] = target;
    }
    for (let i = N - 1; i >= 0; i--) {
        let target = array[i];
        if (hash[sum - target]) {
            return [hash[sum - target], target];
        }
    }
    return [];
}

console.log(
    FindNumbersWithSum(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        21
    )
);
