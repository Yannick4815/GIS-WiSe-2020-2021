import * as Http from "http";

export namespace P_3_1Server {
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
        let url: string = document.forms[0].action;
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "?" + query.toString();
        await fetch(url);
    }
}