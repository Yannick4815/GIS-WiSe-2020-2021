"use strict";
async function sendData() {
    let formData = new FormData(document.forms[0]);
    let url = "https://testgis2021.herokuapp.com";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    let response = await fetch(url);
    console.log(response.text());
    /*let response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
      });*/
}
function hello() {
    let formData = new FormData(document.forms[0]);
    let query = new URLSearchParams(formData);
    console.log(query);
}
//# sourceMappingURL=client.js.map