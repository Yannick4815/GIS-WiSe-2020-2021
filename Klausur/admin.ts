communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
    .then((allDataFetched) =>
        fill(JSON.parse(allDataFetched)["allData"])
        //console.log(allDataFetched);

    );

function fill(_allData: Item[]): void {

    _allData.forEach(element => {
        addRow(element);

    });

    addEL();
}

function addRow(_item: Item): void {
    let div: HTMLElement = document.getElementById("overview");
    let span: HTMLElement = document.createElement("span");

    let span2: HTMLElement = document.createElement("span");
    let div2: HTMLElement = document.createElement("div");
    let div3: HTMLElement = document.createElement("div");
    let div4: HTMLElement = document.createElement("div");


    span2.setAttribute("class", String(_item.status));
    span2.appendChild(div2);
    span2.appendChild(div3);
    span2.appendChild(div4);

    let h4: HTMLElement = document.createElement("h4");
    let statusUser: string;
    if (_item.status == 1) {
        statusUser = "frei";
        span.setAttribute("class", "circleGreen");
    }
    else if (_item.status == 2) {
        statusUser = "reserviert" + " - " + _item.user;
        span.setAttribute("class", "circleOrange");
    }
    else {
        statusUser = "ausgeliehen" + " - " + _item.user;
        span.setAttribute("class", "circleRed");
    }
    h4.innerText = _item.name + " - " + _item.preis + " - " + statusUser;

    h4.appendChild(span2);
    h4.appendChild(span);
    div.appendChild(h4);


}

function addEL(): void {
    document.querySelectorAll(".admin span").forEach(item => {
        item.addEventListener("click", function (this: HTMLElement): void {
            changeState(item, Number(item.className));
        });

    });

    document.querySelectorAll("button").forEach(item => {
        item.addEventListener("click", function (this: HTMLElement): void {
            if (this.innerText == "Nein") {
                let overlay: HTMLElement = document.getElementById("toggleStateOverlay");
                overlay.style.display = "none";
            }

        });

    });



}

function changeState(_item: Element, _state: number): void {
    let state: number;
    let stateText: string;
    let itemName: string = _item.parentElement.innerText.split("-")[0];
    let elVar: HTMLElement = document.getElementById("toggleElementVariable");
    let stVar: HTMLElement = document.getElementById("toggleStatusVariable");
    let overlay: HTMLElement = document.getElementById("toggleStateOverlay");

    if (_state == 2) {
        state = 3;
        stateText = "ausgeliehen";
        overlay.style.display = "block";
    }
    else if (_state == 3) {
        state = 1;
        stateText = "frei";
        overlay.style.display = "block";
    }
    else {
        state = 1;
    }
    

    elVar.innerText = itemName;
    stVar.innerText = stateText;
    
    console.log("Wechsel " + itemName + " zu " + state);
}