
function toggleForm(_activeElement: HTMLElement): void {
    
    let vornameInput: HTMLElement = document.getElementById("vornameInput");
    let nachnameInput: HTMLElement = document.getElementById("nachnameInput");
    let matrikelInput: HTMLElement = document.getElementById("matrikelInput");
    let emailInput: HTMLElement = document.getElementById("emailInput");
    let passwordInput: HTMLElement = document.getElementById("passwordInput");
    let requestInput: HTMLElement = document.getElementById("requestInput");

    if (document.forms[0].style.display == "none") {      //zum testen, ob form augeblenet wurde, zb nach registrierung
        document.forms[0].style.display = "block";
        let h3: HTMLElement = document.getElementById("serverResponse");
        h3.innerText = "";
    }

    if (_activeElement.id == "login") {
        _activeElement.classList.add("active");
        let reg: HTMLElement = document.getElementById("registrieren");
        reg.classList.remove("active");

        

        vornameInput.style.display = "none";
        nachnameInput.style.display = "none";
        matrikelInput.style.display = "none";

        

        requestInput.setAttribute("value", "login");
    }
    else {
        _activeElement.classList.add("active");
        let reg: HTMLElement = document.getElementById("login");
        reg.classList.remove("active");


        vornameInput.style.display = "initial";
        nachnameInput.style.display = "initial";
        matrikelInput.style.display = "initial";

        requestInput.setAttribute("value", "register");
    }
}


async function sendData(): Promise<void> {
    let h3: HTMLElement = document.getElementById("serverResponse");
    let respJSON: ResponseBody = await connect();
    /*let response: Response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(formData)
    });*/
    if (respJSON.status == "error") {
        h3.className = "error";
    }
    else {
        h3.className = "success";
    }
    
    h3.innerText = respJSON.message;
    if (respJSON.status == "loggedIn" || respJSON.status == "registered") {
        document.forms[0].style.display = "none";
    }
    //console.log(await response.text());
}

async function getAllData(): Promise<void> {
    let liste: HTMLElement = document.getElementById("liste");
    let respJSON: ResponseBody = await connect();
    let userList: User[] = JSON.parse(respJSON.message);

    liste.innerHTML = "";
    userList.forEach(user => {
        let h3: HTMLElement = document.createElement("h3");
        h3.innerText = user.vorname + " " + user.nachname + " - " + user.matrikel + " - " + user.email + " - " + user.pwd;
        liste.appendChild(h3);
    });
}

async function connect(): Promise<ResponseBody> {
    let formData: FormData = new FormData(document.forms[0]);
    let formElements: string[] = ["vornameInput", "nachnameInput", "matrikelInput", "emailInput", "passwordInput"];
    let filled: boolean = true;
    let url: string = "https://testgis2021.herokuapp.com";
    //let url: string = "http://localhost:8100";


    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url = url + "?" + query.toString();

    let index: number = 0;
    for (let entry of formData) {
        
        console.log("name: " + entry[0]);
        console.log("value: " + entry[1]);
        if (entry[1] == "" && document.getElementById(formElements[index]).style.display != "none") {
            filled = false;
        }
        index++;
    }

    if (filled) {
        let response: Response = await fetch(url);
        return await response.json();
    }
    else{
        let response: ResponseBody = {status: "error", message: "Alle Felder ausfüllen"};
        return response;
    }
   
}


