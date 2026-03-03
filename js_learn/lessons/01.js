// var a, b;
// (function(){
//     console.log(a); // u
//     console.log(b); // u
//     var a = (b = 3);
//     console.log(a); // 3
//     console.log(b); // 3
// })();

// console.log(a); // 3 -> undefined
// console.log(b); // 3

// var friendName = 'World';
// (function(){
//     if (typeof friendName === 'undefined') {
//         var friendName = 'Jack';
//         console.log('Goodbye ' + friendName);
//     } else {
//         console.log('Hello ' + friendName);
//     }
// })(); 
// Goodbye Jack

function fn1() {
    console.log('fn1');
}

var fn2;

fn1();
fn2();

fn2 = function() {
    console.log('fn2');
}

fn2();

// fn1
// Error...