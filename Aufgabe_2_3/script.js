"use strict";
var data;
(function (data) {
    ////#region Nur auf index.html
    if (window.location.pathname.endsWith("index.html")) {
        //Auswahlmöglichkeiten
        let kopfDiv = document.getElementById("kopf");
        let rumpfDiv = document.getElementById("rumpf");
        let beineDiv = document.getElementById("beine");
        //Allgemein
        let frame = document.getElementById("frame");
        let resetBtn = document.getElementById("reset");
        //Textblöcke
        let kopfAnweisung = document.createElement("h5");
        let rumpfAnweisung = document.createElement("h5");
        let beineAnweisung = document.createElement("h5");
        //Eventlistener
        kopfDiv.addEventListener("click", link1);
        rumpfDiv.addEventListener("click", link2);
        beineDiv.addEventListener("click", link3);
        resetBtn.addEventListener("click", reset);
        //Inhalt generieren
        if (localStorage.figur) {
            kopfDiv.setAttribute("src", "../img/" + JSON.parse(localStorage.figur).kopf.src);
            rumpfDiv.setAttribute("src", "../img/" + JSON.parse(localStorage.figur).rumpf.src);
            beineDiv.setAttribute("src", "../img/" + JSON.parse(localStorage.figur).beine.src);
        }
        if (kopfDiv.src.endsWith("auswahl.png")) {
            kopfAnweisung.innerText = "Kopf auswählen!";
            frame.appendChild(kopfAnweisung);
        }
        if (rumpfDiv.src.endsWith("auswahl.png")) {
            rumpfAnweisung.innerText = "Rumpf auswählen!";
            frame.appendChild(rumpfAnweisung);
        }
        if (beineDiv.src.endsWith("auswahl.png")) {
            beineAnweisung.innerText = "Beine auswählen!";
            frame.appendChild(beineAnweisung);
        }
        if (kopfAnweisung.innerText == "" && rumpfAnweisung.innerText == "" && beineAnweisung.innerText == "") {
            kopfAnweisung.setAttribute("class", "complete"); //kopfAnweisung wird hier als allgemeine Anzeige "Recycelt"
            kopfAnweisung.innerText = "Auswahl vollständig!";
            frame.appendChild(kopfAnweisung);
            let url = "https://gis-communication.herokuapp.com";
            let query = new URLSearchParams(JSON.parse(localStorage.figur));
            url = url + "?" + query.toString();
            //console.log(url);
            communicate(url);
        }
        async function communicate(_url) {
            let response = await fetch(_url);
            let jsonResponse = await response.json();
            let serverResponse = document.createElement("h4");
            if (jsonResponse.hasOwnProperty("error")) {
                serverResponse.innerText = "Error: " + JSON.stringify(jsonResponse.error);
                serverResponse.setAttribute("class", "error");
            }
            else if (jsonResponse.hasOwnProperty("message")) {
                serverResponse.innerText = "Message: " + JSON.stringify(jsonResponse.message);
            }
            else {
                serverResponse.innerText = "Da ist jetzt irgendwas komplett falsch gelaufen";
                serverResponse.setAttribute("class", "error");
            }
            frame.appendChild(serverResponse);
        }
    }
    ////#endregion
    //Auf allen Seiten
    ////#region FUNKTIONEN
    //Links
    function link1() {
        window.location.href = "select.html?typ=1";
    }
    function link2() {
        window.location.href = "select.html?typ=2";
    }
    function link3() {
        window.location.href = "select.html?typ=3";
    }
    //Weiteres
    function reset() {
        console.log("reset");
        localStorage.removeItem("figur");
        window.location.reload();
    }
    if (localStorage.figur) {
        console.log("Figur wird aus Local Storage geparsed");
        data.figur = JSON.parse(localStorage.figur);
    }
    else {
        console.log("Local Storage noch nicht gefüllt, Figur noch nicht erstellt => Wird jetzt gefüllt");
        data.figur = {
            "kopf": { "typ": 0, "name": "", "src": "auswahl.png" },
            "rumpf": { "typ": 0, "name": "", "src": "auswahl.png" },
            "beine": { "typ": 0, "name": "", "src": "auswahl.png" }
        };
    }
    //console.log("JSONStringified = " + JSON.stringify(figur));
    let jsonFigur = JSON.stringify(data.figur);
    //console.log("JSONFigur = " + jsonFigur);
    //console.log("localSt = " + localStorage.figur);
    localStorage.setItem("figur", jsonFigur);
    ////#endregion
})(data || (data = {}));
//# sourceMappingURL=script.js.map