import UIKit



class Sort {
    //
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

class Merge<T: Comparable> {
    
    var aux = [T]()
    var data = [T]()
    init(_ array: [T]) {
        data = array
        self.mergeSort(&data, lo: 0, hi: data.count - 1)
    }
    
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

var number = [Int]()
for _ in 0...100 {
    number.append(Int(arc4random_uniform(100)))
}

var sort = Sort()
var array = ["a", "fuck", "baby", "gogogo"]
var merge = Merge(number)
sort.insertionSort(number, <)
sort.selectionSort(number)
sort.shellSort(number, <)
//merge.mergeBU(number)
//merge.mergeSort(array)

