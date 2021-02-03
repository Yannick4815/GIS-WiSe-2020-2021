/*Eingebunden in index.html*/

let con: HTMLElement = document.getElementById("flexbox");

if (localStorage.orders == undefined) {
    localStorage.orders = JSON.stringify([]);
}
if (localStorage.orders.length == undefined || localStorage.orders.length == 0) {
    localStorage.orders = JSON.stringify([]);
}

function fillSite(_allData: Item[]): void {
    let basketBtn: HTMLElement = document.getElementById("basketBtn");
    let basket: HTMLElement = document.getElementById("basket");
    let basketOverlay: HTMLElement = document.getElementById("basketOverlay");

    let sum: HTMLElement = document.createElement("h4");
    sum.setAttribute("id", "sum");
    basket.appendChild(sum);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        basketBtn.addEventListener("touchstart", function (): void {
            if (localStorage.orders != "[]") {
                if (basketOverlay.classList.contains("displayMobile")) {
                    changeClass(false, basketOverlay, "displayMobile");
                }
                else {
                    changeClass(true, basketOverlay, "displayMobile");
                }

            }
        });
    } else {
        basketBtn.addEventListener("click", function (): void {
            if (localStorage.orders != "[]") {
                if (basketOverlay.classList.contains("displayMobile")) {
                    changeClass(false, basketOverlay, "displayMobile");
                }
                else {
                    changeClass(true, basketOverlay, "displayMobile");
                }

            }
        });
    }


    for (let index: number = 0; index < _allData.length; index++) {

        //main div
        let div: HTMLParagraphElement = document.createElement("div");
        div.setAttribute("class", "item");
        div.setAttribute("id", "item_" + _allData[index]._id);


        //heading div
        let divHeading: HTMLParagraphElement = document.createElement("div");
        divHeading.setAttribute("class", "itemHeading");

        let h4: HTMLParagraphElement = document.createElement("h4");
        h4.innerText = _allData[index].name;
        h4.setAttribute("id", "name_" + _allData[index]._id);

        let divCircle: HTMLParagraphElement = document.createElement("div");
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
        let divImage: HTMLParagraphElement = document.createElement("div");
        divImage.setAttribute("class", "itemImage");

        let img: HTMLParagraphElement = document.createElement("img");
        img.setAttribute("src", _allData[index].img);
        img.setAttribute("alt", _allData[index].name);
        img.setAttribute("onerror", "onError(this)");
        divImage.appendChild(img);


        //description Div
        let divDescription: HTMLParagraphElement = document.createElement("div");
        divDescription.setAttribute("class", "itemDescription");

        let h6: HTMLParagraphElement = document.createElement("h6");
        h6.innerText = _allData[index].preis + "€ / Tag";

        let h5: HTMLParagraphElement = document.createElement("h5");
        h5.innerText = _allData[index].description;

        divDescription.appendChild(h6);
        divDescription.appendChild(h5);


        //order Div
        let divOrder: HTMLParagraphElement = document.createElement("div");
        divOrder.setAttribute("class", "itemOrder");

        let button: HTMLButtonElement = document.createElement("button");
        button.innerText = "In den Warenkorb";
        button.setAttribute("class", "reservierenBtn");
        button.setAttribute("id", "order_" + _allData[index]._id);
        if (_allData[index].status != 1) {
            changeClass(true, div, "disabled");
            changeClass(true, button, "disabled");

        }
        divOrder.appendChild(button);

        //check if item is in basket
        let orders: string[] = JSON.parse(localStorage.orders);
        orders.forEach(el => {
            if (el == _allData[index]._id) {
                changeClass(true, div, "onList");
                button.innerText = "Aus Warenkorb entfernen";
                countAndFillBasket(true, _allData[index].name);
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


/*true = Klasse hinzufügen, false = Klasse entfernen*/
function changeClass(_addOrRemove: boolean, _el: HTMLElement, _class: string): void {
    if (_addOrRemove) {
        _el.classList.add(_class);
    }
    else {
        _el.classList.remove(_class);
    }

}


function toggleOverlay(_orders: string[]): void {
    if (_orders.length > 2) {   // > 2, weil im localStorage, bei einem leeren Array immer noch zwei Zeichen [] sind
        changeClass(true, document.getElementById("basketOverlay"), "display");
    }
    else {
        changeClass(false, document.getElementById("basketOverlay"), "display");
    }
}


function addListeners(): void {
    document.querySelectorAll(".reservierenBtn").forEach(item => {
        let el: HTMLElement = document.getElementById(item.id);

        if (el.classList.contains("disabled")) {
            el.innerText = "Reserviert";
        }
        else {
            item.addEventListener("click", function (this: HTMLButtonElement): void {

                let el: HTMLElement = document.getElementById(this.id);

                let orders: string[] = JSON.parse(localStorage.orders);

                let stringArr: string[] = this.id.split("_");   /*id aufgebaut wie folgt: order_PRODUKTID*/

                let itemEl: HTMLElement = document.getElementById("item_" + stringArr[1]);

                let itemName: string = document.getElementById("name_" + stringArr[1]).innerText;

                let search: string = orders.find(e => e === stringArr[1]);
                console.log(stringArr[1]);

                if (search != undefined) {
                    let key: number = orders.indexOf(search, 0);
                    orders.splice(key, 1);
                    el.innerText = "In den Warenkorb";
                    itemEl.classList.remove("onList");
                    fillStorage(orders);
                    countAndFillBasket(false, itemName);
                }
                else {
                    orders.push(stringArr[1]);
                    el.innerText = "Aus Warenkorb entfernen";
                    itemEl.classList.add("onList");
                    fillStorage(orders);
                    countAndFillBasket(true, itemName);
                }










            });
        }

    });
}


//fülle localStorage mit mitgegebenem Warenkorb
function fillStorage(_orders: string[]): void {
    localStorage.orders = JSON.stringify(_orders);
    console.log(localStorage);
}


//zähle items im Warenkorb
//wenn _add = true, füge mitgegebenes Item auf den Warenkorb
//wenn _add = false, entferne mitgegebenes Item aus dem Warenkorb
function countAndFillBasket(_add: boolean, _item: string): void {
    let itemsCount: number = JSON.parse(localStorage.orders).length;
    let basketBtn: HTMLElement = document.getElementById("basketBtn");
    let basket: HTMLElement = document.getElementById("basket");

    if (_add == true) {
        let h4: HTMLElement = document.createElement("h4");
        h4.innerText = _item;
        h4.setAttribute("id", "basket_" + _item);
        basket.insertBefore(h4, basket.firstChild);
    }
    else {
        let h4: HTMLElement = document.getElementById("basket_" + _item);
        basket.removeChild(h4);
    }

    toggleOverlay(localStorage.orders);

    displaySum(basket);

    basketBtn.innerText = "Warenkorb (" + itemsCount + ")";

}


async function displaySum(_basket: HTMLElement): Promise<void> {

    let sum: HTMLElement = document.getElementById("sum");

    sum.innerText = calculateSum(await getData());

    console.log("basket: " + _basket.hasChildNodes());

}


async function start(): Promise<void> {
    fillSite(await getData());
}

start();








