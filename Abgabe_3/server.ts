import * as Http from "http";


export namespace P_3_1Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }

    
    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
       
        if (_request.method == "POST") {
            let body = "";
            _request.on("formData", data => {
              body += data;
            });
            _request.on("end", async () => {
              let post: any = JSON.parse(body);
              _response.write(post);
            });
            
          }
          else{
            _response.write("Keine POST anfrage");
          }
        
        _response.end();
    }
}