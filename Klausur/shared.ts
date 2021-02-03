
async function getData(): Promise<Item[]> {
    let respJSON: ResponseBody = await connectToServer("getAll");
    let itemList: Item[] = JSON.parse(respJSON.message);
    console.log(itemList);
    return itemList;
}

async function connectToServer(_requestType: string): Promise<ResponseBody> {

    let url: string = "https://testgis2021.herokuapp.com";
    //let url: string = "http://localhost:8100";
    if (_requestType == "getAll") {
        url = url + "?requestType=getAll";
    }
    else if (_requestType == "insert") {
        let formData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
    }
    else {
       url = url + "?" + _requestType;
    }
    console.log(url);

    
    

    let response: Response = await fetch(url);

    return await response.json();

   
}

function calculateSum(_allData: Item[]): string {
    let lSArray: string = JSON.parse(localStorage.orders);
    let sum: number = 0.00;
    for (let i: number = 0; i < lSArray.length; i++) {
        _allData.forEach(element => {
            if (element._id == lSArray[i]) {
                sum += Number(element.preis.replace(",", "."));
            }
        });
    }
    return String(sum.toFixed(2)).replace(".", ",") + " €";
}

function onError(_el: HTMLImageElement): void {
    _el.src = "img/missing.png";
}

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

function moveLabel(_input: HTMLInputElement): void {
    let label: HTMLElement = document.getElementById(_input.id + "Label");
    
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

function message(_mes: string, _target: string): void {
    let body: HTMLElement = document.getElementById("body");
    let container: HTMLDivElement = document.createElement("div");
    let mesDiv: HTMLDivElement = document.createElement("div");
    let mes: HTMLParagraphElement = document.createElement("h2");
    let mes2: HTMLParagraphElement = document.createElement("h5");
    let a: HTMLElement = document.createElement("a");

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

    setTimeout(function() { window.location.href = _target; }, 7000);
}
