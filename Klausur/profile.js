"use strict";
async function go() {
    if (await getUserInfo()) {
        build();
    }
    else {
        message("Es ist ein Fehler Aufgetreten! Der Benutzer wurde nicht gefunden", "index.html");
    }
}
go();
async function getAllUserItems() {
    let response = await connectToServer("requestType=getAllUserItems&user=" + user._id);
    let items;
    let statusUser;
    let start = document.createElement("h2");
    start.setAttribute("id", "listStart");
    document.getElementById("listParent").appendChild(start);
    if (response.status == "success") {
        if (response.message == "empty") {
            items = [];
        }
        else {
            items = JSON.parse(response.message);
        }
        start.innerText = "Ausgeliehene Produkte (" + items.length + ")";
        items.forEach(item => {
            let h4 = document.createElement("h4");
            let span = document.createElement("span");
            if (item.status == 2) {
                statusUser = "reserviert";
                span.setAttribute("class", "circleOrange");
            }
            else {
                statusUser = "ausgeliehen";
                span.setAttribute("class", "circleRed");
            }
            h4.innerText = item.name + " - " + item.preis + "€ - " + statusUser;
            h4.appendChild(span);
            start.appendChild(h4);
        });
    }
    else {
        message("Es ist ein Fehler Aufgetreten!", "index.html");
    }
}
getUserInfo();
function build() {
    let main = document.getElementById("meinBereich");
    let h4 = document.createElement("h3");
    h4.innerText = user.vorname + " " + user.nachname;
    let info1 = document.createElement("h3");
    info1.innerText = user.email;
    main.appendChild(h4);
    main.appendChild(info1);
    getAllUserItems();
}
document.getElementById("back").addEventListener("click", function () {
    window.location.href = "index.html";
});
document.getElementById("abmelden").addEventListener("click", function () {
    localStorage.activeUser = "";
    message("Sie wurden abgemeldet!", "index.html");
});
//# sourceMappingURL=profile.js.map