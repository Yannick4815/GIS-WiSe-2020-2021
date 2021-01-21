

async function sendData(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://testgis2021.herokuapp.com";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    console.log("test");
    let response: Response = await fetch(url);
    /*let response: Response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
      });*/
    console.log(response.body);
}

function hello(): void {
    let formData: FormData = new FormData(document.forms[0]);
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    console.log(query);
}


