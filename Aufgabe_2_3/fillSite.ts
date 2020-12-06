namespace data {

    const queryString: string = window.location.search;
    const urlParams: URLSearchParams = new URLSearchParams(queryString);
    const typ: string = urlParams.get("typ"); //1, 2 oder 3 => Kopf, Rumpf oder Beine

    let con: HTMLElement = document.getElementById("container");


    //Übersicht: communicate() => fillSite() => addListeners() => Warte auf Eingabe => Auswahl speichern und leite auf index.html
    communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Aufgabe_2_3/data.json")
        .then((allDataFetched) =>
            fillSite(Number(typ), JSON.parse(allDataFetched)["allData"])
            //console.log(allDataFetched);

        );


    ////#region FUNKTIONEN
    async function communicate(_url: RequestInfo): Promise<string> {
        let response: Response = await fetch(_url);
        let allDataFetched: string = JSON.stringify(await response.json());
        return allDataFetched;
    }

    function fillSite(_part: number, _allData: Baustein[]): void {
        //console.log(_allData);
        for (let index: number = 0; index < _allData.length; index++) {
            if (_allData[index].typ == _part) {
                let div1: HTMLParagraphElement = document.createElement("div");
                let img: HTMLParagraphElement = document.createElement("img");
                img.setAttribute("src", _allData[index].src);
                img.setAttribute("alt", _allData[index].name);
                img.setAttribute("id", String(_allData[index].typ));
                div1.appendChild(img);
                con.appendChild(div1);
            }
        }
        addListeners();
    }

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
    ////#endregion

}
