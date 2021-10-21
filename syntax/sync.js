var fs = require('fs');


// readFileSync 동기적 : return 값을 준다.
// 순차적 출력 A B C
// console.log('A');
// var result = fs.readFileSync('sample.txt', 'utf8');
// console.log(result);
// console.log('C');

// readFile 비동기적 : 세번째 인자로 함수를 준다.
// 순차적 출력 A C B
console.log('A');
fs.readFile('sample.txt', 'utf8', function(err, result) {
    console.log(result);
});
console.log('C');