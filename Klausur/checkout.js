"use strict";
function fill(_allData) {
    console.log(_allData);
    let overview = document.getElementById("overview");
    let lSArray = JSON.parse(localStorage.orders);
    for (let i = 0; i < lSArray.length; i++) {
        let h4 = document.createElement("h4");
        let span = document.createElement("span");
        _allData.forEach(element => {
            if (element.name == lSArray[i]) {
                h4.innerText = element.name;
                span.innerText = element.preis + " €";
            }
        });
        h4.appendChild(span);
        overview.appendChild(h4);
    }
    fillSum(calculateSum(_allData));
}
function fillSum(_sum) {
    let sum = document.getElementById("sum");
    let span = document.createElement("span");
    sum.innerText = "Summe";
    span.innerText = _sum;
    sum.appendChild(span);
}
communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
    .then((allDataFetched) => fill(JSON.parse(allDataFetched)["allData"])
//console.log("allDataFetched")
);
//# sourceMappingURL=checkout.js.map