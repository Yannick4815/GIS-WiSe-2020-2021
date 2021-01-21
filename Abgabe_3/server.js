"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P_3_1Server = void 0;
const Http = require("http");
const Mongo = require("mongodb");
var P_3_1Server;
(function (P_3_1Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    if (!port)
        port = 8100;
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.method == "POST") {
            let body = "";
            _request.on("formData", data => {
                body += data;
            });
            _request.on("end", async () => {
                let post = JSON.parse(body);
                _response.write(post);
            });
        }
        else {
            _response.write("Keine POST anfrage");
            let orders = connectDB();
            //let orders: string = "testtest";
            _response.write(await orders);
        }
        _response.end();
    }
})(P_3_1Server = exports.P_3_1Server || (exports.P_3_1Server = {}));
async function connectDB() {
    let _url = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    let orders = mongoClient.db("Test").collection("Students");
    return orders;
}
//# sourceMappingURL=server.js.map