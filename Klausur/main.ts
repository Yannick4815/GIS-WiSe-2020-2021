

let con: HTMLElement = document.getElementById("flexbox");

function fillSite(_allData: Item[]): void {
    //console.log(_allData);
    for (let index: number = 0; index < _allData.length; index++) {

        //main div
        let div: HTMLParagraphElement = document.createElement("div");
        div.setAttribute("class", "item");

        //heading div
        let divHeading: HTMLParagraphElement = document.createElement("div");
        divHeading.setAttribute("class", "itemHeading");

        let h4: HTMLParagraphElement = document.createElement("h4");
        h4.innerText = _allData[index].name;

        let divCircle: HTMLParagraphElement = document.createElement("div");
        if (_allData[index].status == 1){
            divCircle.setAttribute("class", "circleGreen");
        }
        else if (_allData[index].status == 2) {
            divCircle.setAttribute("class", "circleOrange");
        }
        else {
            divCircle.setAttribute("class", "circleRed");
        }

        divHeading.appendChild(h4);

        //image Div
        let divImage: HTMLParagraphElement = document.createElement("div");
        divImage.setAttribute("class", "itemImage");

        let img: HTMLParagraphElement = document.createElement("img");
        img.setAttribute("src", _allData[index].img);
        img.setAttribute("alt", _allData[index].name);

        divImage.appendChild(img);

        //description Div
        let divDescription: HTMLParagraphElement = document.createElement("div");
        divDescription.setAttribute("class", "itemDescription");

        let h6: HTMLParagraphElement = document.createElement("h6");
        h6.innerText = _allData[index].preis + "€ / Tag";

        let h5: HTMLParagraphElement = document.createElement("h5");
        h5.innerText = _allData[index].description;

        divDescription.appendChild(h6);
        divDescription.appendChild(h5);
        //order Div
        let divOrder: HTMLParagraphElement = document.createElement("div");
        divOrder.setAttribute("class", "itemOrder");

        let button: HTMLButtonElement = document.createElement("button");
        button.innerText = "In den Warenkorb";

        divOrder.appendChild(button);
        
        
        div.appendChild(divHeading);
        div.appendChild(divImage);
        div.appendChild(divDescription);
        div.appendChild(divOrder);

        con.appendChild(div);

    }
    //addListeners();
}

async function communicate(_url: RequestInfo): Promise<string> {
    console.log("rest");
    let response: Response = await fetch(_url);
    let allDataFetched: string = JSON.stringify(await response.json());
    return allDataFetched;
}

communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
        .then((allDataFetched) =>
            fillSite(JSON.parse(allDataFetched)["allData"])
            //console.log("allDataFetched")

        );
/*
function addListeners(): void {
    document.querySelectorAll("img").forEach(item => {
        item.addEventListener("click", function (): void {

            figur = JSON.parse(localStorage.figur);     //Figur aus dem Localstorage holen

            //ID bestimmt, ob Kopf, Rumpf oder Beine
            if (this.id == "1") {
                figur.kopf.typ = 1;
                figur.kopf.name = this.alt;
                figur.kopf.src = (this.src).replace(/^.*[\\\/]/, "");
            }
            if (this.id == "2") {
                figur.rumpf.typ = 1;
                figur.rumpf.name = this.alt;
                figur.rumpf.src = (this.src).replace(/^.*[\\\/]/, "");
            }
            if (this.id == "3") {
                figur.beine.typ = 1;
                figur.beine.name = this.alt;
                figur.beine.src = (this.src).replace(/^.*[\\\/]/, "");
            }

            localStorage.figur = JSON.stringify(figur);     //veränderte Figur in den LocalStorage packen

            window.location.href = "index.html";
        });
    });
}*/