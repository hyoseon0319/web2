var v1 = 'v1';
// 100000 code

v1 = 'egoing';
var v2 = 'v2';

var o = {
    v1:'v1',
    v2:'v2',
    f1:function() {
        console.log(o.v1);
    },
    f2:function() {
        console.log(o.v2);
    }
}

console.log(v1);
console.log(v2);

function f1() {
    console.log(o.v1);
}

function f2() {
    console.log(o.v2);
}

f1();
f2();

o.f1();
o.f2();

var p = {
    v1:'v1',
    v2:'v2',
    f1:function() {
        console.log(this.v1);
    },
    f2:function() {
        console.log(this.v2);
    }
}

p.f1();
p.f2();