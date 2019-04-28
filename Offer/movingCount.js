function movingCount(threshold, rows, cols) {
    // write code here
    if (threshold < 0 || rows <= 0 || cols <= 0) return 0;
    let visited = [];
    for (let i = 0; i < rows * cols; i++) {
        visited[i] = false;
    }
    let result = movingCountCore(0, 0);
    return result;
    function movingCountCore(row, col) {
        let count = 0;
        if (check(row, col)) {
            visited[row * cols + col] = true;
            count =
                1 +
                movingCountCore(row - 1, col) +
                movingCountCore(row + 1, col) +
                movingCountCore(row, col - 1) +
                movingCountCore(row, col + 1);
        }
        return count;
    }

    function check(row, col) {
        if (
            row >= 0 &&
            row < rows &&
            col >= 0 &&
            col < cols &&
            getDigitSum(row) + getDigitSum(col) <= threshold &&
            !visited[row * cols + col]
        ) {
            return true;
        }
        return false;
    }
}

function getDigitSum(number) {
    let sum = 0;
    while (number > 0) {
        sum += number % 10;
        number = parseInt(number / 10, 10);
    }
    return sum;
}
