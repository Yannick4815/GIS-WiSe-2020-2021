"use strict";
var data;
(function (data) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const typ = urlParams.get("typ");
    console.log(typ);
    let con = document.getElementById("container");
    function fillSite(_part) {
        for (let index = 0; index < data.allData.length; index++) {
            if (data.allData[index].typ == _part) {
                let div1 = document.createElement("div");
                let img = document.createElement("img");
                img.setAttribute("src", data.allData[index].src);
                img.setAttribute("alt", data.allData[index].name);
                img.setAttribute("id", data.allData[index].typ);
                div1.setAttribute("style", "background-color: black;");
                div1.appendChild(img);
                con.appendChild(div1);
            }
        }
    }
    fillSite(typ);
    document.querySelectorAll("img").forEach(item => {
        item.addEventListener("click", function () {
            //document.cookie = "name=sd; path=/";
            document.cookie = "feld" + this.id + "=" + (this.src).replace(/^.*[\\\/]/, '') + "; path=/";
            console.log("cookies" + document.cookie);
            //document.cookie = "name=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            window.location.href = "index.html";
        });
    });
    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }
    //deleteAllCookies();
})(data || (data = {}));
//# sourceMappingURL=fillSite.js.map