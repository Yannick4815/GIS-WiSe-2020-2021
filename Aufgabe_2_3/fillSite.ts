namespace data {

const queryString: string = window.location.search;
const urlParams: URLSearchParams = new URLSearchParams(queryString);
const typ: string = urlParams.get("typ");

console.log(typ);

let con: HTMLElement = document.getElementById("container");

function fillSite(_part: number): void {

    for (let index: number = 0; index < data.allData.length; index++) {
        if (data.allData[index].typ == _part) {
            let div1: HTMLParagraphElement = document.createElement("div");
            let img: HTMLParagraphElement = document.createElement("img");
            img.setAttribute("src", data.allData[index].src);
            img.setAttribute("alt", data.allData[index].name);
            img.setAttribute("id", <string><unknown>data.allData[index].typ);
            div1.setAttribute("style", "background-color: black;");
            div1.appendChild(img);
            con.appendChild(div1);
        }
        
    }
    
}
    
fillSite(<number><unknown>typ);

document.querySelectorAll("img").forEach(item => {
    item.addEventListener("click", function() {
        
        //document.cookie = "name=sd; path=/";
        document.cookie = "feld" + this.id + "=" + (this.src).replace(/^.*[\\\/]/, '') + "; path=/";
        console.log("cookies" + document.cookie);
        //document.cookie = "name=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "index.html";
    });
  });

function deleteAllCookies(): void {
    var cookies: string[] = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie: string = cookies[i];
        var eqPos: number = cookie.indexOf("=");
        var name: string = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
//deleteAllCookies();
}