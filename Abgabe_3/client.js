"use strict";
async function sendData() {
    let formData = new FormData(document.forms[0]);
    let url = "https://testgis2021.herokuapp.com";
    let query = new URLSearchParams(formData);
    url = url + "?" + query.toString();
    let response = await fetch(url);
    /*let response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
    });*/
    console.log(await response.text());
}
//# sourceMappingURL=client.js.map