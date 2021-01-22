import * as Http from "http";
import * as Mongo from "mongodb";

export namespace P_3_1Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);
    if (!port)
        port = 8100;

    let orders: Mongo.Collection;
    connectDB(orders);
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);

    function handleListen(): void {
        console.log("Listening");
    }


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
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
        else {
            _response.write("Keine POST anfrage");
            let result: any = orders.find({});
            //let orders: Promise<Mongo.Collection> = connectDB();
            //let orders: string = "testtest";
            _response.write(result);
        }


        _response.end();
    }
}

async function connectDB(_orders: Mongo.Collection): Promise<void> {
    let _url: string = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    _orders = mongoClient.db("Test").collection("Students");
    
}