function multiply(_num1: number, _num2: number): number {
    return _num1 * _num2;
}
//console.log(max(5, 3));

function max(_n1: number, _n2: number): number {
    if (_n1 < _n2) {
        return _n2;
    }
    else {
        return _n1;
    }
}

function nums(): number {
    let x: number = 0;
    let y: number = 0;
    while ( x <= 100) {
        y += x;
        x++;
    }
    return y;
}
console.log(nums());

function rand(): void {
    for (let index: number = 0; index < 10; index++) {
        console.log(Math.random());
        
    }
}
rand();

function factorial(_n: number): number {
    if (_n < 1) {
        return 1;
    }
    else {
        
        let res: number = 1;
        for (let index: number = _n; index > 1; index--) {
            res *= index;
            
        }
        return res;
    }
}
console.log(factorial(3));


function leapyears(): void {
    let y: number = 1900;

    while (y <= 2020) {
        if (test(y)) {
            console.log(y);
        }
        y++;
    }
}

function test(y: number): boolean {

    for (let index: number = 1; index <= y / 4; index++) {
        if (index * 4 == y) {
            for (let index2: number = 1; index2 < y / 100; index2++) {
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
    for (let index3: number = 1; index3 < y / 400; index3++) {
        if (index3 * 400 == y) {
            return true;
        }
        
    }
    return false;
}