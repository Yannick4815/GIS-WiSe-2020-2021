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
function alert1(): void {
    console.log("kopf");
}
function alert2(): void {
    console.log("rumpf");
}
function alert3(): void {
    console.log("beine");
}
kopfDiv.addEventListener("click", alert1);
rumpfDiv.addEventListener("click", alert2);
beineDiv.addEventListener("click", alert3);