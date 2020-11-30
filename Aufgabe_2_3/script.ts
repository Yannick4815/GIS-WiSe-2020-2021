let main: HTMLElement = document.body;



let kopfDiv: HTMLElement = document.getElementById("kopf");
let rumpfDiv: HTMLElement = document.getElementById("rumpf");
let beineDiv: HTMLElement = document.getElementById("beine");


function cRArr(): void {
    for (let index: number = 0; index < 5; index++) {
        let div1: HTMLParagraphElement = document.createElement("div");
        div1.innerText = "Ein neuer Paragraph an dieser Stelle.";
        div1.setAttribute("style", "background-color: black; height:200px;");
        main.appendChild(div1);
    }
}

function cR(): void {
   
        let div1: HTMLParagraphElement = document.createElement("div");
        div1.innerText = "Ein neuer Paragraph an dieser Stelle.";
        div1.setAttribute("style", "background-color: black; height:200px;");
        main.appendChild(div1);
    
}
function link1(): void {
   window.location.href = "select.html?typ=1";
}
function link2(): void {
    window.location.href = "select.html?typ=2";
}
function link3(): void {
    window.location.href = "select.html?typ=3";
}
kopfDiv.addEventListener("click", link1);
rumpfDiv.addEventListener("click", link2);
beineDiv.addEventListener("click", link3);

function getCookie(cname: string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
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


for (let index: number = 1; index < 4; index++) {
    console.log(getCookie("feld" + index));
}

console.log("cookies" + document.cookie);