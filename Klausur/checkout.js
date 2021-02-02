"use strict";
async function submit() {
    let response = await connectToServer("insert");
    console.log(response);
    if (response.status == "success") {
        localStorage.orders = "";
        message("Vielen Dank für Ihre Reservierung! Sie erhalten weitere Details per E-Mail.", "index.html");
    }
    else {
        document.getElementById("error").classList.add("displayError");
        document.getElementById("error").innerText = response.message;
    }
}
let inputError = document.getElementById("error");
document.getElementById("submit").addEventListener("click", function () {
    document.getElementById("inputVorname").style.borderBottomColor = "#ccc";
    document.getElementById("inputNachname").style.borderBottomColor = "#ccc";
    document.getElementById("email").style.borderBottomColor = "#ccc";
    document.getElementById("pwd").style.borderBottomColor = "#ccc";
    let pass = true;
    if (document.getElementById("inputVorname").style.display != "none") {
        if (!checkFor(document.getElementById("inputVorname"), [""])) {
            inputError.innerText = "Alle Felder ausfüllen";
            inputError.classList.add("displayError");
            document.getElementById("inputVorname").style.borderBottomColor = "red";
            pass = false;
        }
        if (!checkFor(document.getElementById("inputNachname"), [""])) {
            inputError.innerText = "Alle Felder ausfüllen";
            inputError.classList.add("displayError");
            document.getElementById("inputNachname").style.borderBottomColor = "red";
            pass = false;
        }
    }
    if (!checkFor(document.getElementById("email"), [""])) {
        inputError.innerText = "Alle Felder ausfüllen";
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
        submit();
    }
});
document.querySelectorAll("input").forEach(item => {
    item.addEventListener("input", function () {
        console.log("input");
        moveLabel(this);
    });
});
function fill(_allData) {
    console.log(_allData);
    let overview = document.getElementById("overview");
    let arrayInput = document.getElementById("arrayInput");
    let lSArray = JSON.parse(localStorage.orders);
    let itemArray = [];
    for (let i = 0; i < lSArray.length; i++) {
        let h4 = document.createElement("h4");
        let span = document.createElement("span");
        _allData.forEach(element => {
            if (element.name == lSArray[i]) {
                h4.innerText = element.name;
                span.innerText = element.preis + " €";
                itemArray.push(element.name);
            }
        });
        h4.appendChild(span);
        overview.appendChild(h4);
    }
    console.log(itemArray.toString());
    arrayInput.value = JSON.stringify(itemArray);
    fillSum(calculateSum(_allData));
}
async function fillSum(_sum) {
    let sum = document.getElementById("sum");
    let span = document.createElement("span");
    sum.innerText = "Summe";
    span.innerText = _sum;
    sum.appendChild(span);
}
let rT = document.getElementById("requestType");
let inputVorname = document.getElementById("inputVorname");
let inputNachname = document.getElementById("inputNachname");
let labelVorname = document.getElementById("label_inputVorname");
let labelNachname = document.getElementById("label_inputNachname");
document.getElementById("neukunde").addEventListener("click", function () {
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
document.getElementById("anmelden").addEventListener("click", function () {
    if (inputVorname.style.display != "none") {
        inputVorname.style.display = "none";
        inputNachname.style.display = "none";
        labelVorname.style.display = "none";
        labelNachname.style.display = "none";
    }
    this.classList.add("active");
    document.getElementById("neukunde").classList.remove("active");
    rT.value = "login";
});
/*
communicate("https://yannick4815.github.io/GIS-WiSe-2020-2021/Klausur/testData.json")
.then((allDataFetched) =>
    fill(JSON.parse(allDataFetched)["allData"])
    //console.log("allDataFetched")

);*/
async function main() {
    if (localStorage.orders != "[]" && localStorage.orders != "") {
        fill(await getData());
    }
    else {
        message("Es ist ein Fehler aufgetreten!", "index.html");
    }
    console.log("local: " + localStorage.orders);
}
main();
//# sourceMappingURL=checkout.js.map