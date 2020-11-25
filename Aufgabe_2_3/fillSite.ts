namespace data {

let con: HTMLElement = document.getElementById("container");

function fillSite(_part: number): void {

    for (let index: number = 0; index < data.allData.length; index++) {
        if (data.allData[index].typ == _part) {
            let div1: HTMLParagraphElement = document.createElement("div");
            div1.innerText = "<img src='" + data.allData[index].src + "' alt='" + data.allData[index].name + "'>";
            div1.setAttribute("style", "background-color: black;");
            con.appendChild(div1);
        }
        
    }
    
}
    
fillSite(1);

}