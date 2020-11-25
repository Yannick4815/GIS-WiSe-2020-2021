"use strict";
let main = document.body;
let kopfDiv = document.getElementById("kopf");
let rumpfDiv = document.getElementById("rumpf");
let beineDiv = document.getElementById("beine");
function cRArr() {
    for (let index = 0; index < 5; index++) {
        let div1 = document.createElement("div");
        div1.innerText = "Ein neuer Paragraph an dieser Stelle.";
        div1.setAttribute("style", "background-color: black; height:200px;");
        main.appendChild(div1);
    }
}
function cR() {
    let div1 = document.createElement("div");
    div1.innerText = "Ein neuer Paragraph an dieser Stelle.";
    div1.setAttribute("style", "background-color: black; height:200px;");
    main.appendChild(div1);
}
function alert1() {
    console.log("kopf");
}
function alert2() {
    console.log("rumpf");
}
function alert3() {
    console.log("beine");
}
kopfDiv.addEventListener("click", alert1);
rumpfDiv.addEventListener("click", alert2);
beineDiv.addEventListener("click", alert3);
//# sourceMappingURL=script.js.map