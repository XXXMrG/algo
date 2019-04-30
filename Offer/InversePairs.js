/**
 *
 * @param {[]} data
 */

function InversePairs1(data) {
    // write code here
    if (data.length <= 1) return 0;
    let N = data.length;
    let result = 0;
    for (let i = 1; i < N; i++) {
        let j = i;
        while (j > 0 && data[j] < data[j - 1]) {
            [data[j], data[j - 1]] = [data[j - 1], data[j]];
            j--;
            result++;
        }
    }
    return result % 1000000007;
}
// 归并排序的正确写法，不用每次都进行一次复制，要把两个复制轮流使用就行了。
function InversePairs(data) {
    if (data.length <= 1) return 0;
    let N = data.length;
    let result = 0;
    let copy = data.slice();
    function merge(data, aux, start, mid, end) {
        let low = mid;
        let high = end;
        for (let i = end; i >= start; i--) {
            if (low < start) {
                data[i] = aux[high];
                high--;
            } else if (high < mid + 1) {
                data[i] = aux[low];
                low--;
            } else if (aux[low] > aux[high]) {
                data[i] = aux[low];
                low--;
                result += high - mid;
            } else {
                data[i] = aux[high];
                high--;
            }
        }
    }

    function core(data, aux, start, end) {
        if (start >= end) return;
        let mid = start + parseInt((end - start) >> 1, 10);
        core(aux, data, start, mid);
        core(aux, data, mid + 1, end);
        merge(data, aux, start, mid, end);
    }
    core(data, copy, 0, N - 1);
    return result % 1000000007;
}

let data = [
    364,
    637,
    341,
    406,
    747,
    995,
    234,
    971,
    571,
    219,
    993,
    407,
    416,
    366,
    315,
    301,
    601,
    650,
    418,
    355,
    460,
    505,
    360,
    965,
    516,
    648,
    727,
    667,
    465,
    849,
    455,
    181,
    486,
    149,
    588,
    233,
    144,
    174,
    557,
    67,
    746,
    550,
    474,
    162,
    268,
    142,
    463,
    221,
    882,
    576,
    604,
    739,
    288,
    569,
    256,
    936,
    275,
    401,
    497,
    82,
    935,
    983,
    583,
    523,
    697,
    478,
    147,
    795,
    380,
    973,
    958,
    115,
    773,
    870,
    259,
    655,
    446,
    863,
    735,
    784,
    3,
    671,
    433,
    630,
    425,
    930,
    64,
    266,
    235,
    187,
    284,
    665,
    874,
    80,
    45,
    848,
    38,
    811,
    267,
    575
];

console.log(InversePairs(data));
console.log(data);


function InversePairs2(data) {
    if (!data || data.length < 2) return 0;

    var copy = data.slice(),
        count = 0;
    count = mergeSort(data, copy, 0, data.length - 1);
    return count % 1000000007;
}

function mergeSort(data, copy, start, end) {
    if (end === start) return 0;
    var mid = (end - start) >> 1,
        left = mergeSort(copy, data, start, start + mid),
        right = mergeSort(copy, data, start + mid + 1, end),
        count = 0,
        p = start + mid, //前一个数组的最后一个下标
        q = end, //后一个数组的下标
        copyIndex = end; //辅助数组下标，从最后一个算起

    while (p >= start && q >= start + mid + 1) {
        if (data[p] > data[q]) {
            count += q - start - mid;
            copy[copyIndex--] = data[p--];
        } else {
            copy[copyIndex--] = data[q--];
        }
    }

    while (p >= start) {
        copy[copyIndex--] = data[p--];
    }

    while (q >= start + mid + 1) {
        copy[copyIndex--] = data[q--];
    }
    return left + right + count;
}
