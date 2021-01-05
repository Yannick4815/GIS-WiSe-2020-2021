"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT); //port herausfinden und in variable schreiben
    if (!port) //wenn kein port gesetzt ist, ihn auf 8100 stellen
        port = 8100;
    let server = Http.createServer(); //server in variable schreiben
    server.addListener("request", handleRequest); //bei request die Funktion handleRequeest ausführen
    server.addListener("listening", handleListen); //"leerlauf" des Servers, er wartet auf request
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        console.log(_request.url);
        _response.end();
    }
    async function sendForm() {
        let formData = new FormData(document.forms[0]);
        let url = "https://testgis2021.herokuapp.com";
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await fetch(url);
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//# sourceMappingURL=main.js.map