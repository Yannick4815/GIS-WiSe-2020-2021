import * as Http from "http";
import { ParsedUrlQuery } from "querystring";
import * as url from "url";
import * as Mongo from "mongodb";

export namespace P_3_1Server {
    //Diesen Code innerhalb von einem aktiven Server testen:

    let adresse: string = "http://localhost:8080/default.htm?jahr=2017&monat=february";
    //Adresse parsen (umwandeln):
    let q: url.UrlWithParsedQuery = url.parse(adresse, true);

    /*Die parse Methode gibt ein Objekt zurück, dass die URL Eigenschaften enthält. So können die fest definierten Eigenschaften einer URL ausgelesen werden:*/
    console.log(q.host);
    console.log(q.pathname);
    console.log(q.search);

    /*Die query Eigenschaft gibt ein Ojekt zurück, dass alle query-string Parameter als Eigenschaften besitzt. So können beliebig gesendete Attribute ausgelesen werden:*/
    var qdata: ParsedUrlQuery = q.query;
    console.log(qdata.monat);


    console.log("Starting server");
    let port: number = Number(process.env.PORT);    //port herausfinden und in variable schreiben
    if (!port)                                      //wenn kein port gesetzt ist, ihn auf 8100 stellen
        port = 8100;

    let server: Http.Server = Http.createServer();  //server in variable schreiben
    server.addListener("request", handleRequest);   //bei request die Funktion handleRequeest ausführen
    server.addListener("listening", handleListen);  //"leerlauf" des Servers, er wartet auf request
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }


    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        console.log(_request.url);
        _response.end();
    }

    async function sendForm(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://mongodbnetbrowser.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        await fetch(url);
    }

    
    async function connectMDB(): Promise<void> {
        console.log("Waiting");
        let _url: string = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);
        await mongoClient.connect();
        console.log("Success2");
        let orders: Mongo.Collection = mongoClient.db("Test").collection("Students");
        console.log(orders.findOne);
        orders.insertOne({vorname: "Test", nachname: "TestNach", matrikel: 123456});
    }
    console.log("Test");
    connectMDB();

}
//mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority