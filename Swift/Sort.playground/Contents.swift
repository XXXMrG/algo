import UIKit



class Sort {
    
    func selectionSort<T>(_ array: [T], _ isOrderedBefore: (T, T) -> Bool) -> [T] {
        var a = array
        let N = a.count
        var count = 0
        for i in 0..<N {
            var min = i
            for j in (i + 1)..<N {
                if isOrderedBefore(a[j], a[min]) {
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

class Merge<T> {
    
    var data = [T]()
    
    init(_ array: [T]) {
        data = array
    }
    
    // merge top to bottom
    func mergeSort(_ array: [T], _ isOrderedBefore: (T, T) -> Bool) -> [T] {
        var a = array
        
        return a
    }
}

var number = [Int]()
for _ in 0...100 {
    number.append(Int(arc4random_uniform(100)))
}

var sort = Sort()
var merge = Merge(number)
var array = ["a", "fuck", "baby", "gogogo"]
sort.insertionSort(number, <)
sort.selectionSort(number, >)
sort.shellSort(number, <)

