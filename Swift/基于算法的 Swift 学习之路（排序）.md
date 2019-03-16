# 基于算法的 Swift 学习之路（排序）
#iOS
#Algorithm
- - - -

## 排序
这里给出了六大排序的 Swift 语言实现，大部分代码是基于算法4th 的 JAVA 实现直接实现的，也有充分利用 Swift 语言特性的更为简洁的实现。
代码中涉及到的 Swift 特性，我选择用算法这样一种实际应用情况来为大家阐述，更为易懂和实用。

## 选择排序

```swift
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
```

最简单的排序方式，不断选择最小的元素移到第一个元素，因此是个稳定的算法，这里我们要强调的有两个，第一个就是我们在下面经常用到的 Array.swapAt(_ : Int, _ : Int) ，Swift 直接为我们封装好了交换数组两个元素的方法，简单而高效。
接下来要说的就是 Swift 中的泛型，我们在这里为方法定义了一个泛型 T 并且要求这个泛型要实现 Comparable 协议，这于算四里直接使用 JAVA 中的 Comparable 超类差不多，但是泛型就意味着我们需要在调用这个方法的时候明确指出这个泛型的真正类型，这种问题常常并不会出现在函数泛型的使用中，因为我们既然为函数声明了泛型，就一定会为其传入相应的参数，Swift 会通过参数自动推断出该泛型。
但是我们要知道，同样的泛型声明方法也是可以在类身上的，我们在 JAVA 中为一个泛型类声明的时候要明显的给出实际类型，但是在 Swift 中，我们除了这样显示给出泛型外，如果我们的构造方法里传入了该类型的参数，那么我们就无需再重复声明泛型，Swift 会帮我们推断出该泛型，同时对于这个对象本身，该泛型已经确定，不能再更改了，否则会出现一个类中两个泛型的困扰。
关于 Comparable 协议，任何遵循了该协议的变量都自动拥有该协议中包含的几个方法 `< > <= >=` 等，也就跟其字面意思相同，这是一个可以比较的变量。
同样的协议还有 Equalable ，其包含的方法是 `== != ``

## 插入排序（冒泡排序）

```
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
```

插入排序，很多高级排序的基础，也是对于小型数组排序最快的排序方法。
对于有序数组也有着很高的排序效率

这里涉及的 Swift 特性在于那个特别长的参数，也就是那个函数参数。
我们知道在 Swift 中，函数是一等类型，可以作为返回值和参数直接使用。
这一次我们的泛型并没有直接实现 Comparable 协议，而是用了一个函数直接将操作符 `> < ` 直接当作参数传入，因此可以通过参数来控制递增排序和递减排序，关于 Swift 中的操作符，实际上也是一个函数，我们也可以通过重载为其增加更多的方法。


## 希尔排序

```swift

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
```

插入排序的优化版，通过递增序列使其性能大大提升。

## 归并排序
这也是个稳定的排序

```swift
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
```

涉及到的 Swift 特性：

* Array.reserveCapacity
* inout 和 &
* subsequence

在归并排序中，我们在知道需要的额外数组长度的情况下使用了 reserveCapacity 这个方法来为数组增加备用容量，我们都知道 Swift 中的数组跟 js python 相同，都是动态数组，多数情况下我们是不需要关心数组大小的，但是通过这种事前为数组增加容量的方式可以让我们在需要大量 append 操作的时候减少系统消耗。

inout 和 & ，Swift 与 JAVA 不同，对于对象类参数的处理是直接修改其原对象信息。Swift 仍然继承了 C 的基础，对象型参数会复制一份到函数中，同时，这个变量是个 let 型，也就是说我们并不能直接操作这个变量，对这个变量的操作就更不可能影响到函数外。这是 Swift 为了贯彻其安全的理念的措施。
那么对于需要直接更改实际变量的操作呢，我们就要用到 inout 和 & 这一对操作符，有一点像 C 中的指针，带有 inout 的参数才能被直接访问和修改。

subsequence ，在最后的方法中我们直接使用区间运算作为数组的下标来访问同一个数组的前后两部分，但是我们要注意的是，这样得到的实际上并非是个数组，而是个遵守了 subsequence 的类型，而数组，他实现的是 sequence 协议，这两个还不太一样，因此我们在传入参数的时候将其进行了类型转换。

## 快速排序

```swift
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
```

天下第一的快排

涉及到的 Swift 特性：
有几个数组高级操作：
* shuffle()
* filter

shuffle 和 shuffled ，求求你们不要再🦐几把手写那些鬼随机打乱算法了，人家写的好好的，一个直接操作数组，一个返回打乱后的数组。

filter 这是个 Swift 4.2+ 增加的新方法，用于直接选出数组中符合某一类条件的元素，返回值是个数组，用在快排里简直爽到飞起，但是应该是现在的 oj 都还不支持这个函数，这个方法和 reduce ， map 都可能是面试中的重点。


## 堆排序

```swift
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
        var N = array.count - 1
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

```

堆排序没啥的，基本都说完了。需要注意的就是这里的 for 循环和 python 的相同，不能带什么操作，同时倒序的话，可以用 reserve 或者是 stride 将步长设定为 -1。


## Reference

[总结 Swift 中随机数的使用 -  CocoaChina 苹果开发中文站 - 最热的iPhone开发社区 最热的苹果开发社区 最热的iPad开发社区](http://www.cocoachina.com/ios/20150929/13624.html)
