function solution(N) {
    if (N < 3) return 1;
    let year = [3, 1];
    for (let i = 3; i < N; i++) {
        year = year.map(v => {
            return v + 1;
        });
        year = year.filter(v => {
            if (v <= 10) {
                return v;
            }
        });
        let count = year.filter(v => {
            if (v >= 3 && v <= 7) {
                return v;
            }
        }).length;
        for (let i = 0; i < count; i++) {
            year.push(1);
        }
        //console.log(year);
        //console.log(year.length);
    }
    //console.log(year);
    console.log(year.length);
}

//solution(12);

function solution2 (array) {
    let count = 0;
    let partCount = 0;
    let N = array.length;
    for (let i = 0; i < N; i++) {
        if (array[i] == 1) {
            partCount++;
        } else {
            partCount = 0;
        }
        count = Math.max(count, partCount);
    }
    console.log(count);
}

// solution2([1,0,0,1,1,1,0,1]);
let str = "1 1 1 2 2 2 5 5 5 6 6 9 9";
/**
 * 
 * @param {string} data 
 */
function solution3 (data) {
    //let N = data.length;
    let regex = /(\d)\1\1/g;
    data = data.replace(/\s/g, "");
    data = data.replace(regex, "");
    if (data.length === 4) {
        console.log(parseInt(data[0], 10));
    } else {
    console.log(data);
    }
}
solution3(str);

