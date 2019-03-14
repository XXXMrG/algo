import UIKit


// 选择，插入，希尔三大简单排序
class Sort {
    // 遵循 Comparable 使得泛型可以被比较
    func selectionSort<T: Comparable>(_ array: [T]) -> [T] {
        var a = array
        let N = a.count
        var count = 0
        for i in 0..<N {
            var min = i
            for j in (i + 1)..<N {
                if a[j] < a[min] {
                    min = j
                    count += 1
                }
            }
            // Array 库函数，交换两个元素
            a.swapAt(i, min)
        }
        print("selectionSort cost \(count)")
        return a
    }
    
    
    func insertionSort<T>(_ array: [T], _ isOrderedBefore: (T, T) -> Bool) -> [T] {
        var a = array
        var count = 0
        for x in 1..<a.count {
            var y = x
            while y > 0 && isOrderedBefore(a[y], a[y - 1]) {
                a.swapAt(y - 1, y)
                count += 1
                y -= 1
            }
        }
        print("insert cost \(count)")
        return a
    }
    
    func shellSort<T> (_ array: [T], _ isOrderedBefore: (T, T) -> Bool) -> [T] {
        var a = array
        let N = a.count
        var h = 1
        var count = 0
        // 递增序列
        while h < N / 3 {
            h = 3 * h + 1
        }
        while h >= 1 {
            for i in h..<N {
                var j = i
                while j >= h && isOrderedBefore(a[j], a[j-h]) {
                    a.swapAt(j, j-h)
                    count += 1
                    //print(a)
                    j -= h
                }
            }
            h = h / 3
        }
        print("shell cost \(count)")
        return a
    }
}
// 归并排序
class Merge<T: Comparable> {
    
    var aux = [T]()
    var data = [T]()
    init(_ array: [T]) {
        data = array
        self.mergeSort(&data, lo: 0, hi: data.count - 1)
    }
    // 使用 inout 来操作实际参数
    func merge(_ array: inout [T], _ lo: Int, _ mid: Int, _ hi: Int){
        var i = lo
        var j = mid + 1
        aux = array
        for k in lo...hi {
            if i > mid {
                array[k] = aux[j]
                j += 1
            }
            else if j > hi {
                array[k] = aux[i]
                i += 1
            }
            else if aux[j] < aux[i] {
                array[k] = aux[j]
                j += 1
            }
            else {
                array[k] = aux[i]
                i += 1
            }
        }
    }
    
    
    
    // merge high to low
    func mergeSort(_ array: inout [T], lo: Int, hi: Int){
        if hi <= lo {
            return
        }
        
        let mid = lo + (hi - lo) / 2
        mergeSort(&array, lo: lo, hi: mid)
        mergeSort(&array, lo: mid + 1, hi: hi)
        merge(&array, lo, mid, hi)
    }
    
    // merge low to high
    func mergeBU(_ array: [T]) -> [T] {
        var a = array
        let N = a.count
        // 归并子数组大小
        var sz = 1
        while sz < N {
            var lo = 0
            while lo < N - sz {
                // 用 N - 1 防止数组越界
                merge(&a, lo, lo+sz-1, min(lo+sz+sz-1, N-1))
                // 参与归并的数组大小是子数组的两倍
                lo += sz + sz
            }
            sz = sz + sz
        }
        return a
    }
    
    // 不操作原数组的方式
    func merge(leftPile: [T], rightPile: [T]) -> [T] {
        // 1
        var leftIndex = 0
        var rightIndex = 0
        
        // 2
        var orderedPile = [T]()
        // 为数组申请备用容量，减少长度动态变化的开销
        orderedPile.reserveCapacity(leftPile.count + rightPile.count)
        
        // 3
        // 两个归并的数组有一个用完就会停止判断
        while leftIndex < leftPile.count && rightIndex < rightPile.count {
            if leftPile[leftIndex] < rightPile[rightIndex] {
                orderedPile.append(leftPile[leftIndex])
                leftIndex += 1
            } else if leftPile[leftIndex] > rightPile[rightIndex] {
                orderedPile.append(rightPile[rightIndex])
                rightIndex += 1
            } else {
                // 如果一样大，各放入归并的数组一次
                orderedPile.append(leftPile[leftIndex])
                leftIndex += 1
                orderedPile.append(rightPile[rightIndex])
                rightIndex += 1
            }
        }
        
        // 4
        // 右侧数组用完
        while leftIndex < leftPile.count {
            orderedPile.append(leftPile[leftIndex])
            leftIndex += 1
        }
        // 左侧数组用完
        while rightIndex < rightPile.count {
            orderedPile.append(rightPile[rightIndex])
            rightIndex += 1
        }
        
        return orderedPile
    }
    
    func mergeSort(_ array: [T]) -> [T] {
        // guard 更关注的是 else
        guard array.count > 1 else { return array }    // 1
        
        let middleIndex = array.count / 2              // 2
        
        let leftArray = mergeSort(Array(array[0..<middleIndex]))             // 3
        
        let rightArray = mergeSort(Array(array[middleIndex..<array.count]))  // 4
        
        return merge(leftPile: leftArray, rightPile: rightArray)             // 5
    }
}
// 快速排序
class Quick<T: Comparable> {
    var data: [T]
    
    init(_ array: [T]) {
        self.data = array
        // 打乱一个数组 shuffle, shuffled
        // https://developer.apple.com/documentation/swift/array/2994757-shuffled
        data.shuffle()
        //sort(&data, lo: 0, hi: data.count - 1)
        //quick3Sort(&data, lo: 0, hi: data.count - 1)
        data = quicksort(data)
    }
    // 最经典的切分方式，取第一个元素作为基准
    func sort(_ array: inout [T], lo: Int, hi: Int) {
        if hi <= lo {
            return
        }
        let j = partition(&array, lo: lo, hi: hi)
        sort(&array, lo: lo, hi: j - 1)
        sort(&array, lo: j + 1, hi: hi)
    }
    // 手写 partition 实际上可以使用高级操作符 filter 来直接完成切分
    func partition(_ array: inout [T], lo: Int, hi: Int) -> Int {
        var i = lo
        var j = hi + 1
        let v = array[lo]
        while true {
            i += 1
            while array[i] > v {
                if i == hi {
                    break
                }
                i += 1
            }
            j -= 1
            while v > array[j] {
                if j == lo {
                    break
                }
                j -= 1
            }
            if i >= j {
                break
            }
            array.swapAt(i, j)
        }
        array.swapAt(lo, j)
        return j
    }
    
    // 更简洁的写法
    func quicksortHoare(_ a: inout [T], low: Int, high: Int) {
        if low < high {
            let p = partitionHoare(&a, low: low, high: high)
            quicksortHoare(&a, low: low, high: p)
            quicksortHoare(&a, low: p + 1, high: high)
        }
    }
    
    func partitionHoare(_ a: inout [T], low: Int, high: Int) -> Int {
        let pivot = a[low]
        var i = low - 1
        var j = high + 1
        
        while true {
            repeat { j -= 1 } while a[j] > pivot
            repeat { i += 1 } while a[i] < pivot
            
            if i < j {
                a.swapAt(i, j)
            } else {
                return j
            }
        }
    }

    // 三向切分
    func quick3Sort(_ array: inout [T], lo: Int, hi: Int) {
        if hi <= lo {
            return
        }
        var lt = lo, i = lo + 1, gt = hi
        let v = array[lo]
        while i <= gt {
            if array[i] < v {
                array.swapAt(lt, i)
                lt += 1
                i += 1
            }
            else if v < array[i] {
                array.swapAt(i, gt)
                gt -= 1
            }
            else {
                i += 1
            }
        }
        quick3Sort(&array, lo: lo, hi: lt - 1)

        quick3Sort(&array, lo: gt + 1, hi: hi)

    }
    // 三项切分，利用高级函数，效率并不太高
    func quicksort<T: Comparable>(_ a: [T]) -> [T] {
        guard a.count > 1 else { return a }
        
        //let pivot = a[a.count/2]
        let pivot = a[0]
        let less = a.filter { $0 < pivot }
        let equal = a.filter { $0 == pivot }
        let greater = a.filter { $0 > pivot }
        
        return quicksort(less) + equal + quicksort(greater)
    }
    // 三向切分，取最后一个元素作为基准
    func partitionLomuto<T: Comparable>(_ a: inout [T], low: Int, high: Int) -> Int {
        let pivot = a[high]
        
        var i = low
        for j in low..<high {
            if a[j] <= pivot {
                (a[i], a[j]) = (a[j], a[i])
                i += 1
            }
        }
        (a[i], a[high]) = (a[high], a[i])
        return i
    }
    
    func quicksortLomuto<T: Comparable>(_ a: inout [T], low: Int, high: Int) {
        if low < high {
            let p = partitionLomuto(&a, low: low, high: high)
            quicksortLomuto(&a, low: low, high: p - 1)
            quicksortLomuto(&a, low: p + 1, high: high)
        }
    }
    
}

// 堆和优先队列

class Heap<T: Comparable> {
    var data = [T]()
    var N = 0
    init(size: Int) {
        data.reserveCapacity(size + 1)
    }
    
    func insert(new: T) {
        N += 1
        data.append(new)
        swim(N)
    }
    // 大元素上浮
    func swim(_ k: Int) {
        var k = k
        while k > 1 && data[k/2] < data[k] {
            // 大节点不断上浮
            data.swapAt(k/2, k)
            k = k / 2
        }
    }
    
    // 小元素下沉
    func sink(_ k: Int) {
        var k = k
        while 2*k <= N {
            var j = 2 * k
            if j < N && data[j] < data[j+1] {
                // 左节点是较小的节点,选择右节点作为新的根结点
                j += 1
            }
            // 如果当前 k 号节点小于其父节点，下沉
            guard data[k] < data[j] else { break }
            data.swapAt(k, j)
            k = j
        }
    }
    
    func delMax() -> T {
        data.swapAt(1, N)
        let max = data.remove(at: N)
        N -= 1
        sink(1)
        return max
    }
}

class heapSort {
    
    func sort(_ array: inout [Int]) {
        var N = array.count
        for k in stride(from: N/2, through: 1, by: -1) {
            sink(&array, k, N)
        }
        
        while N > 1 {
            array.swapAt(1, N)
            N -= 1
            sink(&array, 1, N)
        }
    }
    
    // 大元素上浮
    func swim(_ data: inout [Int], _ k: Int, _ N: Int) {
        var k = k
        while k > 1 && data[k/2] < data[k] {
            // 大节点不断上浮
            data.swapAt(k/2, k)
            k = k / 2
        }
    }
    
    // 小元素下沉
    func sink(_ data: inout [Int], _ k: Int, _ N: Int) {
        var k = k
        while 2*k <= N {
            var j = 2 * k
            if j < N && data[j] < data[j+1] {
                // 左节点是较小的节点,选择右节点作为新的根结点
                j += 1
            }
            // 如果当前 k 号节点小于其父节点，下沉
            guard data[k] < data[j] else { break }
            data.swapAt(k, j)
            k = j
        }
    }
}

var number = [Int]()
for _ in 0..<15 {
    number.append(Int(arc4random_uniform(1000)))
}

//var sort = Sort()
var array = ["a", "fuck", "baby", "gogogo"]
//var merge = Merge(number)
//sort.insertionSort(number, <)
//sort.selectionSort(number)
//sort.shellSort(number, <)
//merge.mergeBU(number)
//merge.mergeSort(array)

var quick = Quick(number)
//print(quick.data)

//var heap = Heap<Int>(size: 100)
//heap.data.append(0)
//print(number)
//for num in number {
//    heap.insert(new: num)
//}
//print(heap.delMax())
//
//var heapsort = heapSort()
//heapsort.sort(&number)
//print(number)

