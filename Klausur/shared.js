"use strict";
window.onload = function () {
    if (localStorage == null) {
        message("LocalStorage wird nicht unterstützt", "index.html");
    }
};
async function getData() {
    let respJSON = await connectToServer("getAll");
    let itemList = JSON.parse(respJSON.message);
    return itemList;
}
async function connectToServer(_requestType) {
    let url = "https://testgis2021.herokuapp.com";
    //let url: string = "http://localhost:8100";
    if (_requestType == "getAll") {
        url = url + "?requestType=getAll";
    }
    else if (_requestType == "insert") {
        let formData = new FormData(document.forms[0]);
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
    }
    else {
        url = url + "?" + _requestType;
    }
    let response = await fetch(url);
    return await response.json();
}
function calculateSum(_allData) {
    let lSArray = JSON.parse(localStorage.orders);
    let sum = 0.00;
    for (let i = 0; i < lSArray.length; i++) {
        _allData.forEach(element => {
            if (element._id == lSArray[i]) {
                sum += Number(element.preis.replace(",", "."));
            }
        });
    }
    return String(sum.toFixed(2)).replace(".", ",") + " €";
}
function onError(_el) {
    _el.src = "img/missing.png";
}
function checkFor(_el, _searchArray) {
    let pass = false;
    let inputElement = _el;
    let inputAsArray = inputElement.value.split("");
    if (_searchArray[0] == "contains") {
        for (let i = 1; i < _searchArray.length; i++) {
            if (!inputAsArray.includes(_searchArray[i])) {
                pass = false;
                break;
            }
            else {
                pass = true;
            }
        }
    }
    else {
        _searchArray.forEach(query => {
            if (query == "") {
                if (inputElement.value != "") {
                    pass = true;
                }
            }
            else {
                for (let i = 0; i < inputAsArray.length; i++) {
                    if (!_searchArray.includes(inputAsArray[i])) {
                        pass = false;
                        break;
                    }
                    else {
                        pass = true;
                    }
                }
            }
        });
    }
    return pass;
}
function moveLabel(_input) {
    let label = document.getElementById(_input.id + "Label");
    if (_input.value != "") {
        label.classList.add("moveBack");
        label.classList.remove("move");
        _input.placeholder = "";
    }
    else {
        label.classList.add("move");
        label.classList.remove("moveBack");
        _input.placeholder = label.innerText;
    }
}
function message(_mes, _target) {
    let body = document.getElementById("body");
    let container = document.createElement("div");
    let mesDiv = document.createElement("div");
    let mes = document.createElement("h2");
    let mes2 = document.createElement("h5");
    let a = document.createElement("a");
    body.innerHTML = "";
    container.setAttribute("class", "mesContainer");
    mesDiv.setAttribute("class", "mesDiv");
    mes.innerText = _mes;
    a.setAttribute("href", _target);
    a.innerText = "oder klicken Sie hier";
    mes2.innerText = "Sie werden in Kürze automatisch weitergeleitet";
    mesDiv.appendChild(mes);
    mesDiv.appendChild(mes2);
    mesDiv.appendChild(a);
    container.appendChild(mesDiv);
    body.appendChild(container);
    setTimeout(function () { window.location.href = _target; }, 7000);
}
let inputError;
function findAndSetError() {
    if (document.querySelectorAll("form").length == 1 && document.querySelectorAll("#submit").length == 1) {
        let error = document.createElement("h6");
        error.setAttribute("id", "error");
        let submit = document.getElementById("submit");
        document.querySelector("form").insertBefore(error, submit);
        inputError = document.getElementById(error.id);
    }
}
async function submit(_type) {
    findAndSetError();
    let response = await connectToServer("insert");
    if (response.status == "success" && _type == "order") {
        localStorage.orders = "";
        message("Vielen Dank für Ihre Reservierung! Sie erhalten weitere Details per E-Mail.", "index.html");
    }
    else if (response.status == "success" && _type == "loginIndex") {
        localStorage.activeUser = response.message;
        window.location.href = "profile.html";
    }
    else {
        inputError.classList.add("displayError");
        inputError.innerText = response.message;
    }
}
let user;
async function getUserInfo() {
    if (localStorage.activeUser != undefined && localStorage.activeUser != "") {
        let response = await connectToServer("requestType=getUserInfo&user=" + localStorage.activeUser);
        if (response.status == "success") {
            user = JSON.parse(response.message);
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=shared.js.map