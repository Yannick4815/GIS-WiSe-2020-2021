"use strict";
async function communicate2(_url) {
    console.log("rest");
    let response = await fetch(_url);
    let allDataFetched = JSON.stringify(await response.json());
    console.log(allDataFetched);
    return allDataFetched;
}
communicate2("https://yannick4815.github.io/GIS-WiSe-2020-2021/Aufgabe_2_3/data.json")
    .then((allDataFetched) => fillSite2()
//console.log("allDataFetched")
);
function fillSite2() {
    console.log("_allDataFetched");
}
//# sourceMappingURL=test.js.map