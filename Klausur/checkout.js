"use strict";
document.getElementById("submit").addEventListener("click", function () {
    connectToServer("insert");
    console.log("reservierung inserted");
    window.location.href = "index.html";
    localStorage.orders = "";
});
function fill(_allData) {
    console.log(_allData);
    let overview = document.getElementById("overview");
    let arrayInput = document.getElementById("arrayInput");
    let lSArray = JSON.parse(localStorage.orders);
    let itemArray = [];
    for (let i = 0; i < lSArray.length; i++) {
        let h4 = document.createElement("h4");
        let span = document.createElement("span");
        _allData.forEach(element => {
            if (element.name == lSArray[i]) {
                h4.innerText = element.name;
                span.innerText = element.preis + " €";
                itemArray.push(element.name);
            }
        });
        h4.appendChild(span);
        overview.appendChild(h4);
    }
    console.log(itemArray.toString());
    arrayInput.value = JSON.stringify(itemArray);
    fillSum(calculateSum(_allData));
}
async function fillSum(_sum) {
    let sum = document.getElementById("sum");
    let span = document.createElement("span");
    sum.innerText = "Summe";
    span.innerText = _sum;
    sum.appendChild(span);
}
/*
communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
.then((allDataFetched) =>
    fill(JSON.parse(allDataFetched)["allData"])
    //console.log("allDataFetched")

);*/
async function main() {
    fill(await getData());
}
main();
//# sourceMappingURL=checkout.js.map