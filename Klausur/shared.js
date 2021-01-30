"use strict";
async function getData() {
    let respJSON = await connectToServer("getAll");
    let itemList = JSON.parse(respJSON.message);
    console.log(itemList);
    return itemList;
}
async function connectToServer(_requestType) {
    let url = "http://localhost:8100";
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
    console.log(url);
    //let url: string = "https://testgis2021.herokuapp.com";
    let response = await fetch(url);
    return await response.json();
}
function calculateSum(_allData) {
    let lSArray = JSON.parse(localStorage.orders);
    let sum = 0.00;
    for (let i = 0; i < lSArray.length; i++) {
        _allData.forEach(element => {
            if (element.name == lSArray[i]) {
                sum += Number(element.preis.replace(",", "."));
            }
        });
    }
    return String(sum.toFixed(2)).replace(".", ",") + " €";
}
function onError(_el) {
    _el.src = "img/missing.png";
}
//# sourceMappingURL=shared.js.map