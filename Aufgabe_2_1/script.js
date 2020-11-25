"use strict";
function multiply(_num1, _num2) {
    return _num1 * _num2;
}
//console.log(max(5, 3));
function max(_n1, _n2) {
    if (_n1 < _n2) {
        return _n2;
    }
    else {
        return _n1;
    }
}
function nums() {
    let x = 0;
    let y = 0;
    while (x <= 100) {
        y += x;
        x++;
    }
    return y;
}
console.log(nums());
function rand() {
    for (let index = 0; index < 10; index++) {
        console.log(Math.random());
    }
}
rand();
function factorial(_n) {
    if (_n < 1) {
        return 1;
    }
    else {
        let res = 1;
        for (let index = _n; index > 1; index--) {
            res *= index;
        }
        return res;
    }
}
console.log(factorial(3));
function leapyears() {
    let y = 1900;
    while (y <= 2020) {
        if (test(y)) {
            console.log(y);
        }
        y++;
    }
}
function test(y) {
    for (let index = 1; index <= y / 4; index++) {
        if (index * 4 == y) {
            for (let index2 = 1; index2 < y / 100; index2++) {
                if (index2 * 400 == y) {
                    return false;
                }
            }
            return true;
        }
        else if (index >= y / 4) {
            return false;
        }
    }
    for (let index3 = 1; index3 < y / 400; index3++) {
        if (index3 * 400 == y) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=script.js.map