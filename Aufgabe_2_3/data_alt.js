"use strict";
var data;
(function (data) {
    data.allData = [
        { "typ": 1, "name": "Kopf_1", "src": "../img/kopf1.png" },
        { "typ": 1, "name": "Kopf_2", "src": "../img/kopf2.png" },
        { "typ": 1, "name": "Kopf_3", "src": "../img/kopf3.png" },
        { "typ": 1, "name": "Kopf_4", "src": "../img/kopf4.png" },
        { "typ": 1, "name": "Kopf_5", "src": "../img/kopf5.png" },
        { "typ": 2, "name": "Rumpf_1", "src": "../img/rumpf1.png" },
        { "typ": 2, "name": "Rumpf_2", "src": "../img/rumpf2.png" },
        { "typ": 2, "name": "Rumpf_3", "src": "../img/rumpf3.png" },
        { "typ": 2, "name": "Rumpf_4", "src": "../img/rumpf4.png" },
        { "typ": 2, "name": "Rumpf_5", "src": "../img/rumpf5.png" },
        { "typ": 3, "name": "Beine_1", "src": "../img/beine1.png" },
        { "typ": 3, "name": "Beine_2", "src": "../img/beine2.png" },
        { "typ": 3, "name": "Beine_3", "src": "../img/beine3.png" },
        { "typ": 3, "name": "Beine_4", "src": "../img/beine4.png" },
        { "typ": 3, "name": "Beine_5", "src": "../img/beine5.png" }
    ];
    let myJSON = "[";
    for (let index = 0; index < data.allData.length; index++) {
        let myObj = data.allData[index];
        myJSON += JSON.stringify(myObj);
    }
    /* console.log(myJSON);
     document.cookie = myJSON;
     let c: string = document.cookie;
     console.log(c);*/
})(data || (data = {}));
//# sourceMappingURL=data_alt.js.map