async function communicate(_url: RequestInfo): Promise<string> {
    console.log("rest");
    let response: Response = await fetch(_url);
    let allDataFetched: string = JSON.stringify(await response.json());
    return allDataFetched;
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
    return String(sum).replace(".", ",") + " €";
}