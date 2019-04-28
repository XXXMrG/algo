/**
 * 
 * @param {[[]]} matrix 
 */
// 顺时针打印矩阵，注意不要重复打印
function printMatrix(matrix) {
    if (!matrix) return [];
    let result = [];
    // 列数，也就是 X 坐标
    let cols = matrix[0].length;
    // 行数，也就是 Y 坐标
    let rows = matrix.length;
    if (cols === 0 || rows === 0) return [];
    let start = 0;
    while (rows > start * 2 && cols > start * 2) {
        printCircle(matrix, start);
        start++;
    }
    function printCircle (array, start) {
        let endX = cols - start - 1;
        let endY = rows - start - 1;
        // 横向打印第一行，这步是必不可少的
        for (let i = start; i <= endX; i++) {
            result.push(array[start][i]);
        }
        // 向下走，行数必须大于起始行号
        if (endY > start) {
            for (let i = start + 1; i <= endY; i++) {
                result.push(array[i][endX]);
            }
        }
        // 向左走，行数和列数都要大于起始点
        if (endX > start && endY > start) {
            for (let i = endX - 1; i >= start; i--) {
                result.push(array[endY][i]);
            }
        }
        // 向上走,列数要比起始点大一
        if (endX > start && endY - 1 > start) {
            for (let i = endY - 1; i > start; i--) {
                result.push(array[i][start]);
            }
        }
    }
    return result;
}

console.log(
    printMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
);

