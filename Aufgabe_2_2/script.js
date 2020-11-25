"use strict";
function min(..._inputs) {
    let kleinste = _inputs[0];
    for (let index = 1; index < _inputs.length; index++) {
        if (_inputs[index] < kleinste) {
            kleinste = _inputs[index];
        }
    }
    console.log(kleinste);
}
min(1, 2, -10, 4);
class Student {
    constructor(_matrikel, _name, _alter) {
        this.matrikel = _matrikel;
        this.name = _name;
        this.alter = _alter;
    }
    showInfo() {
        console.log(this.name);
        console.log(this.alter);
        console.log(this.matrikel);
    }
}
let st1 = new Student(123456, "Student_1", 25);
let st2 = new Student(372658, "Student_2", 20);
st2.showInfo();
/*
let st1: Student = {matrikel: 123456, name: "Student_1", alter: 20};

let st2: Student = {matrikel: 987654, name: "Student_2", alter: 25};

let st3: Student = {matrikel: 234567, name: "Student_3", alter: 23};

let studenten: Student[] = [st1, st2, st3];

studenten.push({matrikel: 382569, name: "Student_4", alter: 18});

console.log(studenten[3].matrikel);

function showInfo(_index: number): void {
    console.log(studenten[_index].name);
    console.log(studenten[_index].alter);
    console.log(studenten[_index].matrikel);
}
showInfo(2);
*/
let arr = [1, 2, 3, 4];
function backwards(arr) {
    let arrB = [];
    for (let index = arr.length; index > 0; index--) {
        console.log(arr.length - index);
        console.log(index - 1);
        arrB[(arr.length - index)] = arr[(index - 1)];
    }
    return arrB;
}
function join(arr1, arr2) {
    let arr3 = [];
    for (let index = 0; index < arr1.length; index++) {
        arr3[index] = arr1[index];
    }
    for (let index = arr1.length; index < arr1.length + arr2.length; index++) {
        arr3[index] = arr2[index - arr1.length];
    }
    return arr3;
}
let arrBack = backwards(arr);
console.log(arrBack);
console.log(join(arr, [15, 9001, -440]));
let canvas = document.getElementById("myFirstCanvas");
let context = canvas.getContext("2d");
context.lineWidth = 10;
/*
context.strokeRect(75, 140, 150, 110);

context.fillRect(130, 190, 40, 60);

context.beginPath();
context.moveTo(50, 140);
context.lineTo(150, 60);
context.lineTo(250, 140);
context.closePath();
context.stroke();*/
let path = new Path2D();
context.fillStyle = 'blue';
context.fillRect(0, 0, 500, 300);
context.fillStyle = 'green';
context.fillRect(0, 300, 500, 100);
context.fillStyle = 'fff';
context.fillRect(100, 100, 60, 20);
function createRect() {
    let r1 = { x: Math.random() * 500, y: Math.random() * 400, w: Math.random() * 500, h: Math.random() * 400 };
    return r1;
}
function drawRect(r) {
    context.fillRect(r.x, r.y, r.w, r.h);
}
context.stroke();
let arrRe = [];
for (let index = 0; index < 5; index++) {
    arrRe.push(createRect());
}
for (let index = 0; index < arrRe.length; index++) {
    drawRect(arrRe[index]);
}
//# sourceMappingURL=script.js.map