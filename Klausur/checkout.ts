


function fill(_allData: Item[]): void {
    console.log(_allData);
    let overview: HTMLElement = document.getElementById("overview");
    let lSArray: string = JSON.parse(localStorage.orders);
    for (let i: number = 0; i < lSArray.length; i++) {
        let h4: HTMLElement = document.createElement("h4");
        let span: HTMLElement = document.createElement("span");
        
        _allData.forEach(element => {
            if (element.name == lSArray[i]) {
                h4.innerText = element.name;
                span.innerText = element.preis  + " €";
            }
            
        });
        
        h4.appendChild(span);
        overview.appendChild(h4);
    }
    fillSum(calculateSum(_allData));

    
}

function fillSum(_sum: string): void {
    let sum: HTMLElement = document.getElementById("sum");
    let span: HTMLElement = document.createElement("span");
    sum.innerText = "Summe";
    span.innerText = _sum;
    sum.appendChild(span);

}
communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
.then((allDataFetched) =>
    fill(JSON.parse(allDataFetched)["allData"])
    //console.log("allDataFetched")

);
