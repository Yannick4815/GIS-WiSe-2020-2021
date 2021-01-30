
async function getData(): Promise<Item[]> {
    let respJSON: ResponseBody = await connectToServer("getAll");
    let itemList: Item[] = JSON.parse(respJSON.message);
    console.log(itemList);
    return itemList;
}

async function connectToServer(_requestType: string): Promise<ResponseBody> {


    let url: string = "http://localhost:8100";
    if (_requestType == "getAll"){
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

    //let url: string = "https://testgis2021.herokuapp.com";
    

    let response: Response = await fetch(url);

    return await response.json();

   
}

function calculateSum(_allData: Item[]): string {
    let lSArray: string = JSON.parse(localStorage.orders);
    let sum: number = 0.00;
    for (let i: number = 0; i < lSArray.length; i++) {
        _allData.forEach(element => {
            if (element.name == lSArray[i]) {
                sum += Number(element.preis.replace(",", "."));
            }
        });
    }
    return String(sum.toFixed(2)).replace(".", ",") + " €";
}

function onError(_el: HTMLImageElement): void {
    _el.src = "img/missing.png";
}