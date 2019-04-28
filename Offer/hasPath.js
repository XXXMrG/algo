/**
 *
 * @param {[]} matrix
 * @param {number} rows
 * @param {number} cols
 * @param {string} path
 * 这题是用字符串加上行列标模拟的矩阵哦
 */
function hasPath(matrix, rows, cols, path) {
    // write code here
    if (!matrix || !path || rows < 1 || cols < 1) {
        return false;
    }
    let visited = [];
    matrix = matrix.split("")
    let str = path.split("");
    for (let i = 0; i < matrix.length; i++) {
        visited.push(false);
    }
    let pathLength = 0;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (hasPathCore(row, col)) {
                return true;
            }
        }
    }
    return false;

    function hasPathCore(row, col) {
        if (!str[pathLength]) return true;
        let hasPath = false;
        if (
            row >= 0 &&
            row < rows &&
            col >= 0 &&
            col < cols &&
            matrix[row * cols + col] === str[pathLength] &&
            !visited[row * cols + col]
        ) {
            pathLength++;
            visited[row * cols + col] = true;
            hasPath =
                hasPathCore(row, col - 1) ||
                hasPathCore(row, col + 1) ||
                hasPathCore(row - 1, col) ||
                hasPathCore(row + 1, col);
            if (!hasPath) {
                pathLength--;
                visited[row * cols + col] = false;
            }
        }
        return hasPath;
    }
}
