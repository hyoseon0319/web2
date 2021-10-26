// array, object

function f () {
    console.log(1+1);
    console.log(1+2);    
}

var f1 = function () {
    console.log(1+3);
    console.log(1+4);
}

console.log(f);
f();

console.log(f1);
f1();

// var i = if (true) { console.log(1) };
// var w = while (true) { console.log(1) };


var a = [f];
console.log(a);
a[0]();

var o = {
    func:f
}
o.func();