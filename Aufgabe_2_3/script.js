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
function link1() {
    window.location.href = "select.html?typ=1";
}
function link2() {
    window.location.href = "select.html?typ=2";
}
function link3() {
    window.location.href = "select.html?typ=3";
}
kopfDiv.addEventListener("click", link1);
rumpfDiv.addEventListener("click", link2);
beineDiv.addEventListener("click", link3);
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "../img/auswahl.png";
}
kopfDiv.setAttribute("src", "../img/" + getCookie("feld1"));
rumpfDiv.setAttribute("src", "../img/" + getCookie("feld2"));
beineDiv.setAttribute("src", "../img/" + getCookie("feld3"));
for (let index = 1; index < 4; index++) {
    console.log(getCookie("feld" + index));
}
console.log("cookies" + document.cookie);
//# sourceMappingURL=script.js.map