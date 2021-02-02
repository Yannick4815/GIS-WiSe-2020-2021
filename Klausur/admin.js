"use strict";
mainAdmin();
async function mainAdmin() {
    fillList(await getData());
}
function fillList(_allData) {
    _allData.forEach(element => {
        addRow(element);
    });
    addEL();
}
let itemArray = [];
async function addRow(_item) {
    let div = document.getElementById("overview");
    let span = document.createElement("span");
    itemArray.push(_item._id, _item.user, _item.name, _item.preis, String(_item.status), _item.description, _item.img);
    let h4 = document.createElement("h4");
    let statusUser;
    let userIndex = itemArray.indexOf(_item._id);
    if (_item.status == 1) {
        statusUser = "frei";
        span.setAttribute("class", "circleGreen");
    }
    else if (_item.status == 2) {
        statusUser = "reserviert" + " - " + await findUser(_item.user);
        span.setAttribute("class", "circleOrange");
    }
    else {
        statusUser = "ausgeliehen" + " - " + await findUser(_item.user);
        span.setAttribute("class", "circleRed");
    }
    h4.innerText = _item.name + " - " + _item.preis + " - " + statusUser;
    h4.setAttribute("id", _item._id);
    h4.appendChild(span);
    div.appendChild(h4);
    h4.addEventListener("click", function () {
        let index = itemArray.indexOf(this.id);
        console.log(itemArray);
        console.log(index);
        changeState(this, Number(itemArray[index + 4]), index);
        console.log(this.id);
    });
}
function addEL() {
    document.querySelectorAll("button").forEach(item => {
        item.addEventListener("click", function () {
            if (this.innerText == "Nein") {
                let overlay = document.getElementById("toggleStateOverlay");
                let delOverlay = document.getElementById("deleteOverlay");
                overlay.style.display = "none";
                delOverlay.style.display = "none";
            }
        });
    });
}
function changeState(_item, _state, _index) {
    let state;
    let stateText;
    let itemName = itemArray[_index + 2];
    let elVar = document.getElementById("toggleElementVariable");
    let stVar = document.getElementById("toggleStatusVariable");
    let overlay = document.getElementById("toggleStateOverlay");
    let objectVar = document.getElementById("objectId");
    let delOverlay = document.getElementById("deleteOverlay");
    let delElVar = document.getElementById("deleteElementVariable");
    console.log("change: " + itemName);
    if (_state == 2) {
        state = 3;
        stateText = "ausgeliehen";
        overlay.style.display = "block";
        elVar.innerText = itemName;
        stVar.innerText = stateText;
    }
    else if (_state == 3) {
        state = 1;
        stateText = "frei";
        overlay.style.display = "block";
        elVar.innerText = itemName;
        stVar.innerText = stateText;
    }
    else {
        delOverlay.style.display = "block";
        state = 1;
        delElVar.innerText = itemName;
    }
    objectVar.value = itemArray[_index];
    console.log("Wechsel " + (_index + 2) + " zu " + state);
}
async function findUser(_id) {
    let res = await connectToServer("requestType=findUser&user=" + _id);
    return res.message;
}
document.getElementById("toggleYes").addEventListener("click", function () {
    let request;
    let elVar = document.getElementById("objectId");
    let stateVar = document.getElementById("toggleStatusVariable");
    let state;
    if (stateVar.innerText == "frei") {
        state = 1;
    }
    else {
        state = 3;
    }
    request = "requestType=changeState&element=" + elVar.value + "&state=" + state;
    connectToServer(request);
    reload("toggleStateDiv");
});
function reload(_id) {
    let div = document.getElementById(_id);
    let img = document.createElement("img");
    img.setAttribute("src", "img/loading.gif");
    img.setAttribute("alt", "loading");
    div.innerHTML = "";
    div.appendChild(img);
    setTimeout(function () { window.location.reload(); }, 2000);
}
document.getElementById("deleteYes").addEventListener("click", function () {
    let elVar = document.getElementById("objectId");
    let request;
    console.log("delete" + elVar.innerText);
    request = "requestType=delete&element=" + elVar.value;
    connectToServer(request);
    reload("deleteOverlayDiv");
});
document.getElementById("deleteNo").addEventListener("click", function () {
    document.getElementById("deleteOverlay").style.display = "none";
});
document.querySelectorAll("input").forEach(item => {
    item.addEventListener("input", function () {
        moveLabel(this);
        checkLength(this);
        updatePreview();
    });
});
document.getElementById("submit").addEventListener("click", async function () {
    document.getElementById("name").style.borderBottomColor = "#ccc";
    document.getElementById("preis").style.borderBottomColor = "#ccc";
    document.getElementById("desc").style.borderBottomColor = "#ccc";
    document.getElementById("img").style.borderBottomColor = "#ccc";
    let inputError = document.getElementById("error");
    if (!checkFor(document.getElementById("name"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.classList.add("displayError");
        document.getElementById("name").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("preis"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.classList.add("displayError");
        document.getElementById("preis").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("preis"), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","])) {
        inputError.innerText = "Nur Zahlen und Komma verwenden";
        inputError.classList.add("displayError");
        document.getElementById("preis").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("desc"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.classList.add("displayError");
        document.getElementById("desc").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("img"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.classList.add("displayError");
        document.getElementById("img").style.borderBottomColor = "red";
    }
    else {
        let result = await connectToServer("insert");
        if (result.status == "success") {
            message("Produkt erfolgreich hinzugefügt", "admin.html");
        }
        else {
            message("Es ist ein Fehler aufgetreten!", "admin.html");
        }
    }
});
function updatePreview() {
    let inputName = document.getElementById("name");
    let inputPreis = document.getElementById("preis");
    let inputDesc = document.getElementById("desc");
    let inputImg = document.getElementById("img");
    let preview = document.getElementById("previewDiv");
    if (inputName.value != "" || inputPreis.value != "" || inputImg.value != "" || inputDesc.value != "") {
        preview.style.display = "inline-block";
        let preName = document.getElementById("previewName");
        preName.innerText = inputName.value;
        let preImg = document.getElementById("previewImage");
        preImg.src = inputImg.value;
        let prePreis = document.getElementById("previewPreis");
        if (inputPreis.value != "") {
            prePreis.innerText = inputPreis.value + " € / Tag";
        }
        else {
            prePreis.innerText = "";
        }
        let preDesc = document.getElementById("previewDesc");
        preDesc.innerText = inputDesc.value;
    }
    else {
        preview.style.display = "none";
    }
    console.log(inputPreis.value);
}
function checkLength(_el) {
    let inputAsArray = _el.value.split("");
    let errorDisplay = document.getElementById("error");
    if (_el.id == "name") {
        if (inputAsArray.length > 20) {
            inputAsArray.pop();
            _el.value = inputAsArray.join("");
            errorDisplay.innerText = "Maximale Zeichen-Anzahl erreicht";
            errorDisplay.classList.add("displayError");
        }
    }
    if (_el.id == "desc") {
        if (inputAsArray.length > 320) {
            inputAsArray.pop();
            _el.value = inputAsArray.join("");
            errorDisplay.innerText = "Maximale Zeichen-Anzahl erreicht";
            errorDisplay.classList.add("displayError");
        }
    }
}
//# sourceMappingURL=admin.js.map