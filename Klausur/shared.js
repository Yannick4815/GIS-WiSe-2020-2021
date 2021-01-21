"use strict";
async function communicate(_url) {
    console.log("rest");
    let response = await fetch(_url);
    let allDataFetched = JSON.stringify(await response.json());
    return allDataFetched;
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
    return String(sum).replace(".", ",") + " €";
}
//# sourceMappingURL=shared.js.map