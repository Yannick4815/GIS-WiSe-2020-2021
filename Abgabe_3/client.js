"use strict";
function toggleForm(_activeElement) {
    let vornameInput = document.getElementById("vornameInput");
    let nachnameInput = document.getElementById("nachnameInput");
    let matrikelInput = document.getElementById("matrikelInput");
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");
    let requestInput = document.getElementById("requestInput");
    if (document.forms[0].style.display == "none") { //zum testen, ob form augeblenet wurde, zb nach registrierung
        document.forms[0].style.display = "block";
        let h3 = document.getElementById("serverResponse");
        h3.innerText = "";
    }
    if (_activeElement.id == "login") {
        _activeElement.classList.add("active");
        let reg = document.getElementById("registrieren");
        reg.classList.remove("active");
        vornameInput.style.display = "none";
        nachnameInput.style.display = "none";
        matrikelInput.style.display = "none";
        requestInput.setAttribute("value", "login");
    }
    else {
        _activeElement.classList.add("active");
        let reg = document.getElementById("login");
        reg.classList.remove("active");
        vornameInput.style.display = "initial";
        nachnameInput.style.display = "initial";
        matrikelInput.style.display = "initial";
        requestInput.setAttribute("value", "register");
    }
}
async function sendData() {
    let h3 = document.getElementById("serverResponse");
    let respJSON = await connect();
    /*let response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
    });*/
    if (respJSON.status == "error") {
        h3.className = "error";
    }
    else {
        h3.className = "success";
    }
    h3.innerText = respJSON.message;
    if (respJSON.status == "loggedIn" || respJSON.status == "registered") {
        document.forms[0].style.display = "none";
    }
    //console.log(await response.text());
}
async function getAllData() {
    let liste = document.getElementById("liste");
    let respJSON = await connect();
    let userList = JSON.parse(respJSON.message);
    liste.innerHTML = "";
    userList.forEach(user => {
        let h3 = document.createElement("h3");
        h3.innerText = user.vorname + " " + user.nachname + " - " + user.matrikel + " - " + user.email + " - " + user.pwd;
        liste.appendChild(h3);
    });
}
async function connect() {
    let formData = new FormData(document.forms[0]);
    let formElements = ["vornameInput", "nachnameInput", "matrikelInput", "emailInput", "passwordInput"];
    let filled = true;
    let url = "https://testgis2021.herokuapp.com";
    //let url: string = "http://localhost:8100";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    let index = 0;
    for (let entry of formData) {
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
        if (entry[1] == "" && document.getElementById(formElements[index]).style.display != "none") {
            filled = false;
        }
        index++;
    }
    if (filled) {
        let response = await fetch(url);
        return await response.json();
    }
    else {
        let response = { status: "error", message: "Alle Felder ausfüllen" };
        return response;
    }
}
//# sourceMappingURL=client.js.map