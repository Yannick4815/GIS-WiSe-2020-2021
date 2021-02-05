
mainAdmin();
async function mainAdmin(): Promise<void> {
    fillList(await getData());
}


function fillList(_allData: Item[]): void {

    _allData.forEach(element => {
        addRow(element);

    });
}


let itemArray: string[] = [];

async function addRow(_item: Item): Promise<void> {
    let div: HTMLElement = document.getElementById("overview");
    let span: HTMLElement = document.createElement("span");

    itemArray.push(_item._id, _item.user, _item.name, _item.preis, String(_item.status), _item.description, _item.img);

    let h4: HTMLElement = document.createElement("h4");
    let statusUser: string;

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

    h4.innerText = _item.name + " - " + _item.preis + "€ - " + statusUser;
    h4.setAttribute("id", _item._id);
    h4.appendChild(span);
    div.appendChild(h4);

    h4.addEventListener("click", function (this: HTMLElement): void {
        let index: number = itemArray.indexOf(this.id);
        changeState(this, Number(itemArray[index + 4]), index);
    });


}

function changeState(_item: Element, _state: number, _index: number): void {

    let state: number;
    let stateText: string;
    let itemName: string = itemArray[_index + 2];
    let elVar: HTMLElement = document.getElementById("toggleElementVariable");
    let stVar: HTMLElement = document.getElementById("toggleStatusVariable");
    let overlay: HTMLElement = document.getElementById("toggleStateOverlay");
    let objectVar: HTMLInputElement = <HTMLInputElement>document.getElementById("objectId");
    let delOverlay: HTMLElement = document.getElementById("deleteOverlay");
    let delElVar: HTMLElement = document.getElementById("deleteElementVariable");

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

    //console.log("Wechsel " + (_index + 2) + " zu " + state);

}

async function findUser(_id: string): Promise<string> {

    let res: ResponseBody = await connectToServer("requestType=findUser&user=" + _id);
    return res.message;

}

document.getElementById("toggleYes").addEventListener("click", function (this: HTMLButtonElement): void {

    let request: string;
    let elVar: HTMLInputElement = <HTMLInputElement>document.getElementById("objectId");
    let stateVar: HTMLElement = document.getElementById("toggleStatusVariable");
    let state: number;

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

document.getElementById("toggleNo").addEventListener("click", function (this: HTMLElement): void {
    document.getElementById("toggleStateOverlay").style.display = "none";
});

document.getElementById("deleteYes").addEventListener("click", function (this: HTMLButtonElement): void {
    let elVar: HTMLInputElement = <HTMLInputElement>document.getElementById("objectId");
    let request: string;
    console.log("delete" + elVar.innerText);
    request = "requestType=delete&element=" + elVar.value;

    connectToServer(request);
    reload("deleteOverlayDiv");
});

document.getElementById("deleteNo").addEventListener("click", function (this: HTMLButtonElement): void {
    document.getElementById("deleteOverlay").style.display = "none";
});


function reload(_id: string): void {

    let div: HTMLElement = document.getElementById(_id);
    let img: HTMLImageElement = document.createElement("img");
    img.setAttribute("src", "img/loading.gif");
    img.setAttribute("alt", "loading");

    div.innerHTML = "";
    div.appendChild(img);

    setTimeout(function () { window.location.reload(); }, 2000);

}



document.querySelectorAll("input").forEach(item => {
    item.addEventListener("input", function (this: HTMLInputElement): void {
        moveLabel(this);
        checkLength(this);
        updatePreview();

    });
});



document.getElementById("submit").addEventListener("click", async function (this: HTMLInputElement): Promise<void> {
    findAndSetError();

    document.getElementById("name").style.borderBottomColor = "#ccc";
    document.getElementById("preis").style.borderBottomColor = "#ccc";
    document.getElementById("desc").style.borderBottomColor = "#ccc";
    document.getElementById("img").style.borderBottomColor = "#ccc";

    let inputError: HTMLElement = document.getElementById("error");

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
        let result: ResponseBody = await connectToServer("insert");

        if (result.status == "success") {
            message("Produkt erfolgreich hinzugefügt", "admin.html");
        }
        else {
            message("Es ist ein Fehler aufgetreten!", "admin.html");
        }
    }


});



function updatePreview(): void {

    let inputName: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
    let inputPreis: HTMLInputElement = <HTMLInputElement>document.getElementById("preis");
    let inputDesc: HTMLInputElement = <HTMLInputElement>document.getElementById("desc");
    let inputImg: HTMLInputElement = <HTMLInputElement>document.getElementById("img");

    let itemHeadingDiv: HTMLElement = document.getElementById("itemHeading");
    let itemDescriptionDiv: HTMLElement = document.getElementById("itemDescription");

    let preview: HTMLElement = document.getElementById("previewDiv");

    if (inputName.value != "" || inputPreis.value != "" || inputImg.value != "" || inputDesc.value != "") {

        preview.style.display = "inline-block";

        let preName: HTMLElement = document.createElement("h4");
        preName.setAttribute("id", "previewName");
        preName.innerText = inputName.value;
        customAppend(preName, itemHeadingDiv);

        let preImg: HTMLImageElement = <HTMLImageElement>document.getElementById("previewImage");
        preImg.src = inputImg.value;

        let prePreis: HTMLElement = document.createElement("h6");
        prePreis.setAttribute("id", "previewPreis");

        if (inputPreis.value != "") {
            prePreis.innerText = inputPreis.value + " € / Tag";
        }
        else {
            prePreis.innerText = "";
        }

        let preDesc: HTMLElement = document.createElement("h5");
        preDesc.setAttribute("id", "previewDesc");
        preDesc.innerText = inputDesc.value;

        customAppend(prePreis, itemDescriptionDiv);
        customAppend(preDesc, itemDescriptionDiv);
        

    }
    else {
        customRemove("previewName", itemHeadingDiv);
        customRemove("previewPreis", itemDescriptionDiv);
        customRemove("previewDesc", itemDescriptionDiv);
        preview.style.display = "none";
    }
}
function customAppend(_appendChild: HTMLElement, _appendParent: HTMLElement): void {
    if (document.getElementById(_appendChild.id) == null) {
        _appendParent.appendChild(_appendChild);
    }
    else{
        _appendParent.removeChild(document.getElementById(_appendChild.id));
        _appendParent.appendChild(_appendChild);
    }
}
function customRemove(_childId: string, _appendParent: HTMLElement): void {
    let child: HTMLElement = document.getElementById(_childId);
    if (child != null) {
        _appendParent.removeChild(child);
    }
}
function checkLength(_el: HTMLInputElement): void {
    let inputAsArray: string[] = _el.value.split("");
    let errorDisplay: HTMLElement = document.getElementById("error");
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

document.getElementById("filter").addEventListener("input", function (): void {
    filter();
});



function filter(): void {
    let filter: HTMLInputElement = <HTMLInputElement>document.getElementById("filter");
    let elements: NodeList = document.querySelectorAll("h4");
    let results: number = elements.length;
    let noEl: HTMLElement = document.createElement("h3");
    let overview: HTMLElement = document.getElementById("overview");
    noEl.setAttribute("id", "noEl");
    document.querySelectorAll("h4").forEach(el => {
        if (el.innerText.toUpperCase().includes(filter.value.toUpperCase())) {
            if (!el.classList.contains("show")){
                el.classList.add("show");
            }
            if (el.classList.contains("hide")){
                el.classList.remove("hide");
            }
        
            results++;
        }
        else {
            if (el.classList.contains("show")){
                el.classList.remove("show");
            }
            if (!el.classList.contains("hide")){
                el.classList.add("hide");
            }
            results--;
        }

    });
    if (results == 0) {
        noEl.innerText = "Kein Objekt gefunden";
        if (overview.lastElementChild.id != "noEl") {
            overview.appendChild(noEl);
        }
    }
    else {

        if (overview.lastElementChild.id == "noEl") {
            overview.removeChild(overview.lastElementChild);
        }
    }

    console.log(results);
}