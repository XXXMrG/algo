import UIKit

var str = "Hello, playground"

print(str)
let myFloat:Float = 5
print(myFloat)
print(str)

let apples = 5
let oranges = 10

// 只要每一行字符串的缩进与最后三个引号相同，这些缩进都会被忽略
let quotation = """
    I said "I have \(apples) apples."
    And then I said "I have \(apples + oranges) pieces of fruit."
    """

print(quotation)

// 语法糖1 if let 来判断可选值

var optionalString:String? = "fuck"
print(optionalString == nil)

var optionalName: String?
var greeting = "fuck you!"
if let name = optionalName {
    // name 只在此代码块中有效
    greeting = greeting + name
}else {
    greeting = "fuck you \(optionalName ?? "lubenwei")"
}

print(greeting)

// switch 支持任意类型的数据和各种类型的比较操作，不再限制于整型和测试相等上
let vegetable = "red pepper"
switch vegetable {
case "celery":
    print("Add some raisins and make ants on a log.")
case "cucumber", "watercress":
    print("That would make a good tea sandwich.")
case let x where x.hasSuffix("pepper"):
    // hasSuffix
    print("Is it a spicy \(x)?")
    
default:
    print("Everything tastes good in soup.")
}

// 字典的键是无序存储的，因此遍历也是无序的
let interestingNumbers = [
    "Prime": [2, 3, 5, 7, 11, 13],
    "Fibonacci": [1, 1, 2, 3, 5, 8],
    "Square": [1, 4, 9, 16, 25],
]
var largest = 0
var bigKind:String?
for (_, numbers) in interestingNumbers {
    //print(kind)
    for number in numbers {
        if number > largest {
            largest = number
        }
    }
}
//print(bigKind as Any,largest)

var total = 0
for i in 0...4 {
    //print(i)
    total += i
}
//print(total)

// 函数和参数
// 默认情况下，函数使用他们的形式参数名来作为实际参数标签。
// 在形式参数前可以写自定义的实际参数标签，或者使用 _ 来避免使用实际参数标签。

func greet(_ person: String, on day: String) -> String {
    return "Hello \(person), today is \(day)."
}
greet("John", on: "Wednesday")

// 使用元组来返回多个值
func calculateStatistics(scores: [Int]) -> (min: Int, max: Int, sum: Int) {
    var min = scores[0]
    var max = scores[0]
    var sum = 0
    
    for score in scores {
        if score > max {
            max = score
        } else if score < min {
            min = score
        }
        sum += score
    }
    
    return (min, max, sum)
}
let statistics = calculateStatistics(scores: [5, 3, 100, 3, 9])
print(statistics.sum)
print(statistics.0)


// 函数接受多个参数
func sumOf(numbers: Int...) -> Int {
    var sum = 0
    for number in numbers {
        sum += number
    }
    return sum
}
sumOf()
sumOf(numbers: 42, 597, 12)

// 函数是一等类型，可以内嵌，可以返回另一个函数，可以将函数作为参数

func makeIncrementer() -> ((Int) -> Int) {
    func addOne(number: Int) -> Int {
        return 1 + number
    }
    return addOne
}
var increment = makeIncrementer()
increment(7)

func hasAnyMatches(list: [Int], condition: (Int) -> Bool) -> Bool {
    for item in list {
        if condition(item) {
            return true
        }
    }
    return false
}
func lessThanTen(number: Int) -> Bool {
    return number < 10
}

// 注意这个数组
var numbers = [10, 21, 17, 2]
hasAnyMatches(list: numbers, condition: lessThanTen)

// 闭包及其简化写法

numbers.map({
    (number: Int) -> Int in
    let result = 3 * number
    return result
})


let mappedNumbers = numbers.map({ number in 3 * number })
print(mappedNumbers)
// 语法糖 如果闭包作为函数的最后一个参数的话，可以直接在圆括号后写闭包，如果闭包是函数的唯一一个参数，
// 可以不写圆括号，直接写闭包
let sortedNumbers = numbers.sorted { $0 < $1 }
let sorted = numbers.sorted(by: >)
print(sortedNumbers, sorted)


// 类和对象
class NamedShape {
    var numberOfSides: Int = 0
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func simpleDescription() -> String {
        return "A shape with \(numberOfSides) sides."
    }
}

var nameShape = NamedShape(name: "fuck")
nameShape.simpleDescription()

// 继承和方法重写

class Square: NamedShape {
    var sideLength: Double
    
    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 4
    }
    
    func area() ->  Double {
        return sideLength * sideLength
    }
    
    override func simpleDescription() -> String {
        return "A square with sides of length \(sideLength)."
    }
}
let test = Square(sideLength: 5.2, name: "my test square")
test.area()
test.simpleDescription()

// geter & setter

class EquilateralTriangle: NamedShape {
    var sideLength: Double = 0.0
    
    init(sideLength: Double, name: String) {
        self.sideLength = sideLength
        super.init(name: name)
        numberOfSides = 3
    }
    // 计算属性可以在属性值发生改变时进行相应的操作
    var perimeter: Double {
        get {
            return 3.0 * sideLength
        }
        set(myValue) {
            // newValue 是被隐式声明的新值的名字
            //sideLength = newValue / 3.0
            sideLength = myValue / 3.0
        }
    }
    
    override func simpleDescription() -> String {
        return "An equilateral triangle with sides of length \(sideLength)."
    }
}
var triangle = EquilateralTriangle(sideLength: 3.1, name: "a triangle")
print(triangle.perimeter)
triangle.perimeter = 9.9
print(triangle.sideLength)

// 如果你不需要计算属性但仍然需要在设置一个新值的前后执行代码，使用 willSet和 didSet。
// 比如说，下面的类确保三角形的边长始终和正方形的边长相同。

class TriangleAndSquare {
    var triangle: EquilateralTriangle {
        willSet {
            square.sideLength = newValue.sideLength
        }
    }
    
    var square: Square {
        willSet {
            triangle.sideLength = newValue.sideLength
        }
    }
    
    init(size: Double, name: String) {
        square = Square(sideLength: size, name: name)
        triangle = EquilateralTriangle(sideLength: size, name: name)
    }
}

var triangleAndSquare = TriangleAndSquare(size: 10, name: "another test shape")
print(triangleAndSquare.square.sideLength)
print(triangleAndSquare.triangle.sideLength)
triangleAndSquare.square = Square(sideLength: 50, name: "large square")
print(triangleAndSquare.triangle.sideLength)

// 枚举和结构体

enum Rank: Int {
    case ace
    case two, three, four, five, six, seven, eight, nine, ten
    case jack, queen, king
    func simpleDescription() -> String {
        switch self {
        case .ace:
            return "ace"
        case .jack:
            return "jack"
        case .queen:
            return "queen"
        case .king:
            return "king"
        default:
            return String(self.rawValue)
        }
    }
}
let ace = Rank.eight
let aceRawValue = ace.rawValue
ace.simpleDescription()



enum Suit {
    case spades, hearts, diamonds, clubs
    func simpleDescription() -> String {
        switch self {
        case .spades:
            return "spades"
        case .hearts:
            return "hearts"
        case .diamonds:
            return "diamonds"
        case .clubs:
            return "clubs"
        }
    }
}
let hearts = Suit.hearts
let heartsDescription = hearts.simpleDescription()

// 协议和拓展
// 类，枚举，结构体都兼容协议

protocol ExampleProtocol {
    var simpleDescription: String{get}
    // mutating 关键字在结构体使用协议的时候一定要在实现的方法体前声明
    // 在类中则不需要这样声明
    mutating func adjust()
}

struct SimpleStructure: ExampleProtocol {
    var simpleDescription: String = "A simple structure"
    mutating func adjust() {
        simpleDescription += " (adjusted)"
    }
}
var b = SimpleStructure()
b.adjust()
let bDescription = b.simpleDescription

// 使用 extension 来给现存的类型增加功能，新的方法或计算属性等


extension Int: ExampleProtocol {
    var simpleDescription: String {
        return "The number \(self)"
    }
    mutating func adjust() {
        self += 42
    }
}
print(6.simpleDescription)

// 错误处理


