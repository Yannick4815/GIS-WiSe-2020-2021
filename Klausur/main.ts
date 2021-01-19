let con: HTMLElement = document.getElementById("container");

function fillSite(_allData: Item[]): void {
    //console.log(_allData);
    for (let index: number = 0; index < _allData.length; index++) {

        let div: HTMLParagraphElement = document.createElement("div");
        let img: HTMLParagraphElement = document.createElement("img");
        img.setAttribute("src", _allData[index].src);
        img.setAttribute("alt", _allData[index].name);
        img.setAttribute("id", String(_allData[index].typ));
        div.appendChild(img);
        con.appendChild(div);

    }
    addListeners();
}
async function communicate(_url: RequestInfo): Promise<string> {
    let response: Response = await fetch(_url);
    let allDataFetched: string = JSON.stringify(await response.json());
    return allDataFetched;
}

communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
        .then((allDataFetched) =>
            fillSite(JSON.parse(allDataFetched)["allData"])
            //console.log(allDataFetched);

        );


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
}