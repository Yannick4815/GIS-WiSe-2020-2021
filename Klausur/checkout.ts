

document.getElementById("submit").addEventListener("click", function (this: HTMLButtonElement): void {

    findAndSetError();

    document.getElementById("vorname").style.borderBottomColor = "#ccc";
    document.getElementById("nachname").style.borderBottomColor = "#ccc";
    document.getElementById("email").style.borderBottomColor = "#ccc";
    document.getElementById("pwd").style.borderBottomColor = "#ccc";

    let pass: boolean = true;

    if (document.getElementById("vorname").style.display != "none") {
        if (!checkFor(document.getElementById("vorname"), [""])) {
            inputError.innerText = "Alle Felder ausfüllen";
            inputError.classList.add("displayError");
            document.getElementById("vorname").style.borderBottomColor = "red";
            pass = false;
        }
        if (!checkFor(document.getElementById("nachname"), [""])) {
            inputError.innerText = "Alle Felder ausfüllen";
            inputError.classList.add("displayError");
            document.getElementById("nachname").style.borderBottomColor = "red";
            pass = false;
        }
    }
    if (!checkFor(document.getElementById("email"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.classList.add("displayError");
        document.getElementById("email").style.borderBottomColor = "red";
        pass = false;
    }
    if (!checkFor(document.getElementById("email"), ["contains", "@", "."])) {
        inputError.innerText = "Inkorrektes E-Mail-Format";
        inputError.classList.add("displayError");
        document.getElementById("email").style.borderBottomColor = "red";
        pass = false;
    }
    if (!checkFor(document.getElementById("pwd"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
        inputError.classList.add("displayError");
        document.getElementById("pwd").style.borderBottomColor = "red";
        pass = false;
    }

    if (pass) {
        submit("order");
    }

});

document.querySelectorAll("input").forEach(item => {
    item.addEventListener("input", function (this: HTMLInputElement): void {
        moveLabel(this);
    });
});

function fill(_allData: Item[]): void {

    let overview: HTMLElement = document.getElementById("overview");
    let arrayInput: HTMLInputElement = <HTMLInputElement>document.getElementById("arrayInput");
    let lSArray: string = JSON.parse(localStorage.orders);
    let itemArray: string[] = [];

    for (let i: number = 0; i < lSArray.length; i++) {
        let h4: HTMLElement = document.createElement("h4");
        let span: HTMLElement = document.createElement("span");

        _allData.forEach(element => {
            if (element._id == lSArray[i]) {

                h4.innerText = element.name;
                span.innerText = element.preis + " €";
                itemArray.push(element._id);

            }
        });

        h4.appendChild(span);
        overview.appendChild(h4);

    }

    arrayInput.value = JSON.stringify(itemArray);
    fillSum(calculateSum(_allData));
}

async function fillSum(_sum: string): Promise<void> {

    let sum: HTMLElement = document.getElementById("sum");
    let span: HTMLElement = document.createElement("span");
    sum.innerText = "Summe";
    span.innerText = _sum;
    sum.appendChild(span);

}

let rT: HTMLInputElement = <HTMLInputElement>document.getElementById("requestType");

let inputVorname: HTMLInputElement = <HTMLInputElement>document.getElementById("vorname");
let inputNachname: HTMLInputElement = <HTMLInputElement>document.getElementById("nachname");

let labelVorname: HTMLElement = document.getElementById("vornameLabel");
let labelNachname: HTMLElement = document.getElementById("nachnameLabel");

document.getElementById("neukunde").addEventListener("click", function (): void {

    if (inputVorname.style.display != "block") {
        inputVorname.style.display = "block";
        inputNachname.style.display = "block";
        labelVorname.style.display = "block";
        labelNachname.style.display = "block";
    }

    this.classList.add("active");
    document.getElementById("anmelden").classList.remove("active");
    rT.value = "register";
});


document.getElementById("anmelden").addEventListener("click", function (): void {

    anmelden();

});

function anmelden(): void {

    if (inputVorname.style.display != "none") {
        inputVorname.style.display = "none";
        inputNachname.style.display = "none";
        labelVorname.style.display = "none";
        labelNachname.style.display = "none";

    }

    document.getElementById("anmelden").classList.add("active");
    document.getElementById("neukunde").classList.remove("active");
    rT.value = "login";
}


async function main(): Promise<void> {
    
    if (localStorage.orders != "[]" && localStorage.orders != "") {
        fill(await getData());

        if (localStorage.activeUser != undefined && localStorage.activeUser != "") {
            if (await getUserInfo()) {
                anmelden();
                let inputEmail: HTMLInputElement = <HTMLInputElement>document.getElementById("email");
                inputEmail.value = user.email;
    
                let inputPwd: HTMLInputElement = <HTMLInputElement>document.getElementById("pwd");
                inputPwd.value = user.passwort;
            }
            else {
                message("Es ist ein Fehler Aufgetreten! Der Benutzer wurde nicht gefunden", "index.html");
            }
        }
       
    }
    else {
        message("Es ist ein Fehler aufgetreten!", "index.html");
    }
}

main();
