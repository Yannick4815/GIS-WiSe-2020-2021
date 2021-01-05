"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const url = require("url");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    //Diesen Code innerhalb von einem aktiven Server testen:
    let adresse = "http://localhost:8080/default.htm?jahr=2017&monat=february";
    //Adresse parsen (umwandeln):
    let q = url.parse(adresse, true);
    /*Die parse Methode gibt ein Objekt zurück, dass die URL Eigenschaften enthält. So können die fest definierten Eigenschaften einer URL ausgelesen werden:*/
    console.log(q.host);
    console.log(q.pathname);
    console.log(q.search);
    /*Die query Eigenschaft gibt ein Ojekt zurück, dass alle query-string Parameter als Eigenschaften besitzt. So können beliebig gesendete Attribute ausgelesen werden:*/
    var qdata = q.query;
    console.log(qdata.monat);
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
        let url = document.forms[0].action;
        let query = new URLSearchParams(formData);
        url = url + "?" + query.toString();
        await fetch(url);
    }
    async function connectMDB() {
        console.log("Waiting");
        let _url = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
        let mongoClient = new Mongo.MongoClient(_url);
        await mongoClient.connect();
        console.log("Success");
        let orders = mongoClient.db("Test").collection("Students");
        console.log(orders);
    }
    connectMDB();
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
//mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority
//# sourceMappingURL=main.js.map