

mainAdmin();
async function mainAdmin(): Promise<void> {
    fillList(await getData());
}



function fillList(_allData: Item[]): void {

    _allData.forEach(element => {
        addRow(element);

    });

    addEL();
}


let itemArray: string[] = [];
async function addRow(_item: Item): Promise<void> {
    let div: HTMLElement = document.getElementById("overview");
    let span: HTMLElement = document.createElement("span");



    itemArray.push(_item._id, _item.user, _item.name, _item.preis, String(_item.status), _item.description, _item.img);


    let h4: HTMLElement = document.createElement("h4");
    let statusUser: string;
    let userIndex: number = itemArray.indexOf(_item._id);
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

    h4.addEventListener("click", function (this: HTMLElement): void {
        let index: number = itemArray.indexOf(this.id);
        console.log(itemArray);
        console.log(index);
        changeState(this, Number(itemArray[index + 4]), index);
        console.log(this.id);

    });


}

function addEL(): void {

    document.querySelectorAll("button").forEach(item => {
        item.addEventListener("click", function (this: HTMLElement): void {
            if (this.innerText == "Nein") {
                let overlay: HTMLElement = document.getElementById("toggleStateOverlay");
                let delOverlay: HTMLElement = document.getElementById("deleteOverlay");
                overlay.style.display = "none";
                delOverlay.style.display = "none";
            }

        });

    });



}

function changeState(_item: Element, _state: number, _index: number): void {

    let state: number;
    let stateText: string;
    let itemName: string = itemArray[_index + 2];
    let elVar: HTMLElement = document.getElementById("toggleElementVariable");
    let stVar: HTMLElement = document.getElementById("toggleStatusVariable");
    let overlay: HTMLElement = document.getElementById("toggleStateOverlay");

    let delOverlay: HTMLElement = document.getElementById("deleteOverlay");
    let delElVar: HTMLElement = document.getElementById("deleteElementVariable");

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


    

    console.log("Wechsel " + (_index + 2) + " zu " + state);

}

async function findUser(_id: string): Promise<string> {

    let res: ResponseBody = await connectToServer("requestType=findUser&user=" + _id);
    return res.message;
}

document.getElementById("toggleYes").addEventListener("click", function (this: HTMLButtonElement): void {

    let request: string;
    let elVar: HTMLElement = document.getElementById("toggleElementVariable");
    let stateVar: HTMLElement = document.getElementById("toggleStatusVariable");
    let state: number;

    if (stateVar.innerText == "frei") {
        state = 1;
    }
    else {
        state = 3;
    }

    request = "requestType=changeState&element=" + elVar.innerText + "&state=" + state;
    connectToServer(request);
    window.location.reload();
});

document.getElementById("deleteYes").addEventListener("click", function (this: HTMLButtonElement): void {
    let elVar: HTMLElement = document.getElementById("deleteElementVariable");
    let request: string;
    console.log("delete" + elVar.innerText);
    request = "requestType=delete&element=" + elVar.innerText;

    connectToServer(request);
    window.location.reload();
});
document.getElementById("deleteNo").addEventListener("click", function (this: HTMLButtonElement): void {
    document.getElementById("deleteOverlay").style.display = "none";
});



document.querySelectorAll("input").forEach(item => {
    item.addEventListener("input", function (this: HTMLInputElement): void {
        moveLabel(this);
        checkLength(this);
        updatePreview();
        
    });
});
function moveLabel(_input: HTMLInputElement): void {
    let label: HTMLElement = document.getElementById("label_" + _input.id);
    if (_input.value != "") {
        label.classList.add("moveBack");
        label.classList.remove("move");
        _input.placeholder = "";
    }
    else {
        label.classList.add("move");
        label.classList.remove("moveBack");
        _input.placeholder = _input.getAttribute("data");

    }
}

document.getElementById("submit").addEventListener("click", function (this: HTMLInputElement): void {

    document.getElementById("name").style.borderBottomColor = "#ccc";
    document.getElementById("preis").style.borderBottomColor = "#ccc";
    document.getElementById("desc").style.borderBottomColor = "#ccc";
    document.getElementById("img").style.borderBottomColor = "#ccc";

    let inputError: HTMLElement = document.getElementById("inputError");

    if (!checkFor(document.getElementById("name"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.style.display = "inline-block";
        document.getElementById("name").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("preis"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.style.display = "inline-block";
        document.getElementById("preis").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("preis"), ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","])) {
        inputError.innerText = "Nur Zahlen und Komma verwenden";
        inputError.style.display = "inline-block";
        document.getElementById("preis").style.borderBottomColor = "red";
    }
    else if (!checkFor(document.getElementById("desc"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.style.display = "inline-block";
        document.getElementById("desc").style.borderBottomColor = "red";
    } 
    else if (!checkFor(document.getElementById("img"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.style.display = "inline-block";
        document.getElementById("img").style.borderBottomColor = "red";
    } 
    else {
        connectToServer("insert");
        window.location.reload(); 
    }   
    
    
});


function checkFor(_el: HTMLElement, _searchArray: string[]): boolean {
    let pass: boolean = false;
    
    let inputElement: HTMLInputElement = <HTMLInputElement>_el;
    let inputAsArray: string[] = inputElement.value.split("");

    _searchArray.forEach(query => {
        if (query == "") {
            if (inputElement.value != "") {
                pass = true;
            }
        }
        else {
            for (let i: number = 0; i < inputAsArray.length; i++) {
               
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
    return pass;
}

function updatePreview(): void {
    let inputName: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
    let inputPreis: HTMLInputElement = <HTMLInputElement>document.getElementById("preis");
    let inputDesc: HTMLInputElement = <HTMLInputElement>document.getElementById("desc");
    let inputImg: HTMLInputElement = <HTMLInputElement>document.getElementById("img");

    let preview: HTMLElement = document.getElementById("previewDiv");
    if (inputName.value != "" || inputPreis.value != "" || inputImg.value != "" || inputDesc.value != "") {
        preview.style.display = "inline-block";
        let preName: HTMLElement = document.getElementById("previewName");
        preName.innerText = inputName.value;
    
        let preImg: HTMLImageElement = <HTMLImageElement>document.getElementById("previewImage");
        preImg.src = inputImg.value;
    
        let prePreis: HTMLElement = document.getElementById("previewPreis");
        if (inputPreis.value != "") {
            prePreis.innerText = inputPreis.value + " € / Tag";
        }
        else {
            prePreis.innerText = "";
        }
        
    
        let preDesc: HTMLElement = document.getElementById("previewDesc");
        preDesc.innerText = inputDesc.value;
    }
    else {
        preview.style.display = "none";
    }

    console.log(inputPreis.value);

}

function checkLength(_el: HTMLInputElement): void {
    let inputAsArray: string[] = _el.value.split("");
    let errorDisplay: HTMLElement = document.getElementById("inputError");
    if (_el.id == "name") {
        if (inputAsArray.length > 20) {
            inputAsArray.pop();
            _el.value = inputAsArray.join("");
            errorDisplay.innerText = "Maximale Zeichen-Anzahl erreicht";
            errorDisplay.style.display = "block";
        }

    }
    if (_el.id == "desc") {
        if (inputAsArray.length > 320) {
            inputAsArray.pop();
            _el.value = inputAsArray.join("");
            errorDisplay.innerText = "Maximale Zeichen-Anzahl erreicht";
            errorDisplay.style.display = "block";
        }

    }
}