// 随机选择找中位数方法，一个数如果出现次数超过一半，那么这个数是中位数。
function MoreThanHalfNum_Solution(numbers) {
    function partition(array, start, end) {
        let target = array[start];
        let low = start + 1;
        let high = end;
        while (low < high) {
            while (array[low] <= target) {
                low++;
            }
            while (array[high] > target) {
                high--;
            }
            if (low < high) {
                [array[low], array[high]] = [array[high], array[low]];
            }
        }
        [array[start], array[high]] = [array[high], array[start]];
        return high;
    }
    function isMoreThan(array, target) {
        let time = 0;
        array.forEach(v => {
            v === target && time++;
        });
        if (time > parseInt(array.length / 2, 10)) {
            return true;
        } else {
            return false;
        }
    }
    let middle = parseInt(numbers.length / 2, 10);
    let start = 0;
    let end = numbers.length - 1;
    let index = partition(numbers, start, end);
    while (index !== middle) {
        if (index < middle) {
            start = index + 1;
            index = partition(numbers, start, end);
        } else {
            end = index - 1;
            index = partition(numbers, start, end);
        }
    }
    if (isMoreThan(numbers, numbers[middle])) {
        return numbers[middle];
    } else {
        return 0;
    }
}

// 保存一个变量，如果这个值在数组中找到相同的就加一，否则减一，减没了就换一个
// 出现次数最多的那个肯定不会被减没

console.log(MoreThanHalfNum_Solution2([1, 2, 3, 2, 2, 2, 5, 4, 2]));

function MoreThanHalfNum_Solution2(numbers) {
    if (numbers.length === 0) return 0;
    let result = numbers[0];
    let time = 1;
    for (let i = 1; i < numbers.length; i++) {
        if (time === 0) {
            result = numbers[i];
            time = 1;
        } else if (result === numbers[i]) {
            time++;
        } else {
            time--;
        }
    }
    if (isMoreThan(numbers, result)) {
        return result;
    }
    else {
        return 0;
    }
    function isMoreThan(array, target) {
        let time = 0;
        array.forEach(v => {
            v === target && time++;
        });
        if (time > parseInt(array.length / 2, 10)) {
            return true;
        } else {
            return false;
        }
    }
}
