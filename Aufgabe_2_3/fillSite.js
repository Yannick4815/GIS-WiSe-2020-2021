"use strict";
var data;
(function (data) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const typ = urlParams.get("typ"); //1, 2 oder 3 => Kopf, Rumpf oder Beine
    let con = document.getElementById("container");
    communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Aufgabe_2_3/data.json")
        .then((allDataFetched) => fillSite(typ, JSON.parse(allDataFetched)["allData"])
    //console.log(allDataFetched);
    );
    async function communicate(_url) {
        let response = await fetch(_url);
        let allDataFetched = JSON.stringify(await response.json());
        return allDataFetched;
    }
    function fillSite(_part, _allData) {
        console.log(_allData);
        for (let index = 0; index < _allData.length; index++) {
            if (_allData[index].typ == _part) {
                let div1 = document.createElement("div");
                let img = document.createElement("img");
                img.setAttribute("src", _allData[index].src);
                img.setAttribute("alt", _allData[index].name);
                img.setAttribute("id", _allData[index].typ);
                div1.appendChild(img);
                con.appendChild(div1);
            }
        }
        addListeners();
    }
    function addListeners() {
        document.querySelectorAll("img").forEach(item => {
            item.addEventListener("click", function () {
                //document.cookie = "name=sd; path=/";
                //document.cookie = "feld" + this.id + "=" + (this.src).replace(/^.*[\\\/]/, "") + "; path=/";
                console.log("figurTemp=" + localStorage.figur);
                data.figur = JSON.parse(localStorage.figur);
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
                localStorage.figur = JSON.stringify(data.figur);
                /*
                document.cookie = "name" + this.id + "=" + (this.alt).replace(/^.*[\\\/]/, "") + "; path=/";
                document.cookie = "typ" + this.id + "=" + (this.id).replace(/^.*[\\\/]/, "") + "; path=/";*/
                //console.log("cookies: = " + document.cookie);
                //document.cookie = "name=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                window.location.href = "index.html";
            });
        });
    }
})(data || (data = {}));
//# sourceMappingURL=fillSite.js.map