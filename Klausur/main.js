"use strict";
let con = document.getElementById("flexbox");
if (localStorage.orders.length == undefined || localStorage.orders.length == 0) {
    localStorage.orders = JSON.stringify([]);
}
function fillSite(_allData) {
    //console.log(_allData);
    let basketBtn = document.getElementById("basketBtn");
    let basketOverlay = document.getElementById("basketOverlay");
    basketBtn.addEventListener("mouseenter", function () {
        if (localStorage.orders != "[]") {
            changeClass(true, basketOverlay, "displayMobile");
        }
    });
    basketBtn.addEventListener("mouseleave", function () {
        changeClass(false, basketOverlay, "displayMobile");
    });
    basketOverlay.addEventListener("mouseenter", function () {
        changeClass(true, basketOverlay, "displayMobile");
    });
    basketOverlay.addEventListener("mouseleave", function () {
        changeClass(false, basketOverlay, "displayMobile");
    });
    for (let index = 0; index < _allData.length; index++) {
        //main div
        let div = document.createElement("div");
        div.setAttribute("class", "item");
        div.setAttribute("id", "item_" + _allData[index].name);
        //heading div
        let divHeading = document.createElement("div");
        divHeading.setAttribute("class", "itemHeading");
        let h4 = document.createElement("h4");
        h4.innerText = _allData[index].name;
        let divCircle = document.createElement("div");
        if (_allData[index].status == 1) {
            divCircle.setAttribute("class", "circleGreen");
        }
        else if (_allData[index].status == 2) {
            divCircle.setAttribute("class", "circleOrange");
        }
        else {
            divCircle.setAttribute("class", "circleRed");
        }
        divHeading.appendChild(divCircle);
        divHeading.appendChild(h4);
        //image Div
        let divImage = document.createElement("div");
        divImage.setAttribute("class", "itemImage");
        let img = document.createElement("img");
        img.setAttribute("src", _allData[index].img);
        img.setAttribute("alt", _allData[index].name);
        img.setAttribute("onerror", "onError(this)");
        divImage.appendChild(img);
        //description Div
        let divDescription = document.createElement("div");
        divDescription.setAttribute("class", "itemDescription");
        let h6 = document.createElement("h6");
        h6.innerText = _allData[index].preis + "€ / Tag";
        let h5 = document.createElement("h5");
        h5.innerText = _allData[index].description;
        divDescription.appendChild(h6);
        divDescription.appendChild(h5);
        //order Div
        let divOrder = document.createElement("div");
        divOrder.setAttribute("class", "itemOrder");
        let button = document.createElement("button");
        button.innerText = "In den Warenkorb";
        button.setAttribute("class", "reservierenBtn");
        button.setAttribute("id", "order_" + _allData[index].name);
        if (_allData[index].status != 1) {
            changeClass(true, div, "disabled");
            changeClass(true, button, "disabled");
        }
        divOrder.appendChild(button);
        //check if item is in basket
        let orders = JSON.parse(localStorage.orders);
        orders.forEach(el => {
            if (el == _allData[index].name) {
                changeClass(true, div, "onList");
                button.innerText = "Aus Warenkorb entfernen";
                countAndFillBasket(true, el);
            }
        });
        div.appendChild(divHeading);
        div.appendChild(divImage);
        div.appendChild(divDescription);
        div.appendChild(divOrder);
        con.appendChild(div);
    }
    addListeners();
}
function changeClass(_addOrRemove, _el, _class) {
    if (_addOrRemove) {
        _el.classList.add(_class);
    }
    else {
        _el.classList.remove(_class);
    }
}
function toggleOverlay(_orders) {
    if (_orders.length > 2) { // > 2, weil im localStorage, bei einem leeren Array immer noch zwei Zeichen [] sind
        changeClass(true, document.getElementById("basketOverlay"), "display");
    }
    else {
        changeClass(false, document.getElementById("basketOverlay"), "display");
    }
    console.log("orders:" + _orders.length + "count" + _orders);
}
function addListeners() {
    document.querySelectorAll(".reservierenBtn").forEach(item => {
        let el = document.getElementById(item.id);
        if (el.classList.contains("disabled")) {
            el.innerText = "Reserviert";
        }
        else {
            item.addEventListener("click", function () {
                let el = document.getElementById(this.id);
                let orders = JSON.parse(localStorage.orders); //Figur aus dem Localstorage holen
                let stringArr = this.id.split("_");
                let itemEl = document.getElementById("item_" + stringArr[1]);
                let search = orders.find(e => e === stringArr[1]);
                if (search != undefined) {
                    let key = orders.indexOf(search, 0);
                    orders.splice(key, 1);
                    el.innerText = "In den Warenkorb";
                    itemEl.classList.remove("onList");
                    fillStorage(orders);
                    countAndFillBasket(false, stringArr[1]);
                }
                else {
                    orders.push(stringArr[1]);
                    el.innerText = "Aus Warenkorb entfernen";
                    itemEl.classList.add("onList");
                    fillStorage(orders);
                    countAndFillBasket(true, stringArr[1]);
                }
            });
        }
    });
}
//fülle localStorage mit mitgegebenem Warenkorb
function fillStorage(_orders) {
    localStorage.orders = JSON.stringify(_orders);
    console.log(localStorage);
}
//zähle items im Warenkorb
//wenn _add = true, füge mitgegebenes Item auf den Warenkorb
//wenn _add = false, entferne mitgegebenes Item aus dem Warenkorb
function countAndFillBasket(_add, _item) {
    let itemsCount = JSON.parse(localStorage.orders).length;
    let basketBtn = document.getElementById("basketBtn");
    let basket = document.getElementById("basket");
    console.log(itemsCount);
    if (_add == true) {
        let h4 = document.createElement("h4");
        h4.innerText = _item;
        h4.setAttribute("id", "basket_" + _item);
        basket.appendChild(h4);
    }
    else {
        let h4 = document.getElementById("basket_" + _item);
        basket.removeChild(h4);
    }
    displaySum(basket);
    basketBtn.innerText = "Warenkorb (" + itemsCount + ")";
    toggleOverlay(localStorage.orders);
}
async function displaySum(_basket) {
    let sumOld = document.getElementById("sum");
    let h4 = document.createElement("h4");
    h4.innerText = calculateSum(await getData());
    /* communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
         .then((allDataFetched) =>
             h4.innerText = calculateSum(JSON.parse(allDataFetched)["allData"])
             //console.log("allDataFetched")
 
         );*/
    h4.setAttribute("id", "sum");
    console.log("basket: " + _basket.hasChildNodes());
    if (_basket.style.display != "none") {
        _basket.removeChild(sumOld);
    }
    _basket.appendChild(h4);
}
/*communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
    .then((allDataFetched) =>
        fillSite(JSON.parse(allDataFetched)["allData"])
        //console.log("allDataFetched")

    );*/
async function start() {
    fillSite(await getData());
}
start();
//# sourceMappingURL=main.js.map