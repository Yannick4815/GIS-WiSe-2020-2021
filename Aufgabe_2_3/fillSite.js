"use strict";
var data;
(function (data) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const typ = urlParams.get("typ"); //1, 2 oder 3 => Kopf, Rumpf oder Beine
    let con = document.getElementById("container");
    //Übersicht: communicate() => fillSite() => addListeners() => Warte auf Eingabe => Auswahl speichern und leite auf index.html
    communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Aufgabe_2_3/data.json")
        .then((allDataFetched) => fillSite(Number(typ), JSON.parse(allDataFetched)["allData"])
    //console.log(allDataFetched);
    );
    ////#region FUNKTIONEN
    async function communicate(_url) {
        let response = await fetch(_url);
        let allDataFetched = JSON.stringify(await response.json());
        return allDataFetched;
    }
    function fillSite(_part, _allData) {
        //console.log(_allData);
        for (let index = 0; index < _allData.length; index++) {
            if (_allData[index].typ == _part) {
                let div1 = document.createElement("div");
                let img = document.createElement("img");
                img.setAttribute("src", _allData[index].src);
                img.setAttribute("alt", _allData[index].name);
                img.setAttribute("id", String(_allData[index].typ));
                div1.appendChild(img);
                con.appendChild(div1);
            }
        }
        addListeners();
    }
    function addListeners() {
        document.querySelectorAll("img").forEach(item => {
            item.addEventListener("click", function () {
                data.figur = JSON.parse(localStorage.figur); //Figur aus dem Localstorage holen
                //ID bestimmt, ob Kopf, Rumpf oder Beine
                if (this.id == "1") {
                    data.figur.kopf.typ = 1;
                    data.figur.kopf.name = this.alt;
                    data.figur.kopf.src = (this.src).replace(/^.*[\\\/]/, "");
                }
                if (this.id == "2") {
                    data.figur.rumpf.typ = 1;
                    data.figur.rumpf.name = this.alt;
                    data.figur.rumpf.src = (this.src).replace(/^.*[\\\/]/, "");
                }
                if (this.id == "3") {
                    data.figur.beine.typ = 1;
                    data.figur.beine.name = this.alt;
                    data.figur.beine.src = (this.src).replace(/^.*[\\\/]/, "");
                }
                localStorage.figur = JSON.stringify(data.figur); //veränderte Figur in den LocalStorage packen
                window.location.href = "index.html";
            });
        });
    }
    ////#endregion
})(data || (data = {}));
//# sourceMappingURL=fillSite.js.map