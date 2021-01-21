"use strict";
async function sendData() {
    let formData = new FormData(document.forms[0]);
    let url = "https://gis-example.herokuapp.com";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    console.log("test");
    let response = await fetch(url);
    console.log(response);
}
function hello() {
    console.log("hello");
}
//# sourceMappingURL=client.js.map