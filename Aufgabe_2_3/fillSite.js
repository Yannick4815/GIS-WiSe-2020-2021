"use strict";
var data;
(function (data) {
    let con = document.getElementById("container");
    function fillSite(_part) {
        for (let index = 0; index < data.allData.length; index++) {
            if (data.allData[index].typ == _part) {
                let div1 = document.createElement("div");
                div1.innerText = "<img src='" + data.allData[index].src + "' alt='" + data.allData[index].name + "'>";
                div1.setAttribute("style", "background-color: black;");
                con.appendChild(div1);
            }
        }
    }
    fillSite(1);
})(data || (data = {}));
//# sourceMappingURL=fillSite.js.map