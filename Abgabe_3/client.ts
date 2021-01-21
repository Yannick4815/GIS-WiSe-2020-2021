

async function sendData(): Promise<void> {
    let formData: FormData = new FormData(document.forms[0]);
    let url: string = "https://gis-example.herokuapp.com";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();
    console.log("test");
    let response: Response = await fetch(url);
    console.log(response);
}

function hello(): void {
    console.log("hello");
}

