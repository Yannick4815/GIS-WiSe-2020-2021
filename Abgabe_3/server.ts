import * as Http from "http";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";
import * as Url from "url";

export namespace P_3_1Server {

    let orders: Mongo.Collection;

    main();

    async function main(): Promise<void> {
        console.log("Starting server");
        let port: number = Number(process.env.PORT);
        if (!port)
            port = 8100;


        orders = await connectDB();

        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }


    function handleListen(): void {
        console.log("Listening");
    }


    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
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
                _response.write(JSON.stringify(post));
            });

        }
        else {
            //_response.write("Keine POST anfrage");
            let adresse: string = _request.url;
            //Adresse parsen (umwandeln):
            let q: Url.UrlWithParsedQuery = Url.parse(adresse, true);

            /*Die query Eigenschaft gibt ein Ojekt zurück, dass alle query-string Parameter als Eigenschaften besitzt. So können beliebig gesendete Attribute ausgelesen werden:*/
            let qdata: ParsedUrlQuery = q.query;
            //console.log(qdata.email);
            let result: Mongo.Cursor;
            let resArr: User[];

            if (qdata.requestType == "register" || qdata.requestType == "login") {
                result = orders.find({ "email": qdata.email });
            }
            if (qdata.requestType == "getAll") {
                result = orders.find({});
            }

            
            resArr = await result.toArray();
            //let email: string = JSON.stringify(resArr[0].email); //email als string oder []
            let responseBody: ResponseBody = {status: "error", message: ""};
            if (qdata.requestType == "register") {
                if (resArr.length == 0) {
                    console.log("E-Mail frei");

                    orders.insertOne({vorname: qdata.vorname, nachname: qdata.nachname, matrikel: qdata.matrikel, email: qdata.email, pwd: qdata.pwd})
                    responseBody.status = "registered";

                    responseBody.message = "E-Mail angelegt";
                }
                else {
                    console.log("E-Mail besetzt");

                    responseBody.status = "error";

                    responseBody.message = "E-Mail wird bereits verwendet";
                }
            }
            else if (qdata.requestType == "login") {
                if (resArr.length == 0) {
                    console.log("Kein Konto mit dieser E-Mail gefunden");

                    responseBody.status = "error";

                    responseBody.message = "Kein Konto mit dieser E-Mail gefunden";
                }
                else {
                    let pwd: string = resArr[0].pwd;
                    let pwdEntered: string = String(qdata.pwd);
                    if (pwd == pwdEntered ) {
                        console.log("matching");

                        responseBody.status = "loggedIn";

                        responseBody.message = "Sie wurden eingeloggt";
                    }
                    else {
                        console.log("Falsches Passwort");

                        responseBody.status = "error";

                        responseBody.message = "Falsches Passwort";
                    }

                }
                
            }
            else if (qdata.requestType == "getAll") {
                responseBody.status = "fill";
                responseBody.message = JSON.stringify(resArr);
            }

            //console.log("qdata.email:" + qdata.email);
            //console.log("email:" + email);
            //let orders: Promise<Mongo.Collection> = connectDB();
            //let orders: string = "testtest";
            //_response.write(JSON.stringify(await result.toArray()));
            _response.write(JSON.stringify(responseBody));
        }

        //_response.write("Testst");
        _response.end();
    }
}

async function connectDB(): Promise<Mongo.Collection> {
    let _url: string = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    return mongoClient.db("Aufgabe_3").collection("User");
}
