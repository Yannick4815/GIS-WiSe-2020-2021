import * as Http from "http";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";
import * as Url from "url";

export namespace Klausur {

    let items: Mongo.Collection;
    let user: Mongo.Collection;

    main();

    async function main(): Promise<void> {
        console.log("Starting server");
        let port: number = Number(process.env.PORT);
        if (!port)
            port = 8100;


        items = await connectDB("Items");
        user = await connectDB("User");
        findAndSetUser("Kamera 1", "600b0d7934383dc921ee36d5", items);

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

            let q: Url.UrlWithParsedQuery = Url.parse(adresse, true);

            let qdata: ParsedUrlQuery = q.query;
            console.log(qdata.requestType);
            let result: Mongo.Cursor;
            let resArr: Item[];

            let responseBody: ResponseBody = { status: "error", message: "" };

            if (qdata.requestType == "getAll") {
                result = items.find({});
                resArr = await result.toArray();

                responseBody.status = "success";
                responseBody.message = JSON.stringify(resArr);

            }
            else if (qdata.requestType == "insert") {
                console.log("Reading");

                result = user.find({ email: qdata.email });

                let foundUser: Benutzer[] = await result.toArray();
                let newUserObj: Benutzer[];

                //console.log(await result.toArray());
                let id: string;

                if (JSON.stringify(foundUser) == "[]") {
                    user.insertOne({ vorname: qdata.vorname, nachname: qdata.nachname, email: qdata.email });
                    let newUser: Mongo.Cursor = user.find({ email: qdata.email });

                    newUserObj = await newUser.toArray();

                    id = newUserObj[0]._id;
                }
                else {
                    id = foundUser[0]._id;
                }


                let itemArr: string[] = JSON.parse(String(qdata.items));
                itemArr.forEach(element => {
                    findAndSetUser(element, id, items);
                   
                });
                responseBody.status = "success";
                responseBody.message = "Vielen Dank für Ihre Reservierung";
                //result = items.find({});
                //
            }
            else if (qdata.requestType == "changeState") {
                changeItemState(String(qdata.element), Number(qdata.state), items);
            }
            else if (qdata.requestType == "findUser") {
                result = user.find({ _id: new Mongo.ObjectId(String(qdata.user))});
                let foundUser: Benutzer[] = await result.toArray();
                if (JSON.stringify(foundUser) != "[]") {
                    responseBody.message = foundUser[0].vorname + " " + foundUser[0].nachname;
                }
                else {
                    console.log("cant find user " + qdata.user);
                }
                console.log(foundUser);
                
                responseBody.status = "success";
            }
            else if (qdata.requestType == "add") {
                items.insertOne({
                    user: "",
                    name: qdata.name,
                    preis: qdata.preis, 
                    status: 1,
                    description: qdata. description,
                    img: qdata.img
                });
            }   
            else if (qdata.requestType == "delete") {
                console.log("delete " + qdata.element);
                result = items.find({name: qdata.element});
                let foundItem: Item[] = await result.toArray();
                if (foundItem.length > 0) {
                    items.deleteOne({_id: new Mongo.ObjectId(String(foundItem[0]._id))});
                    responseBody.message = "success";
                    responseBody.message = "Löschen erfolgreich";
                }
                else {
                    responseBody.message = "Element nicht gefunden";
                    console.log("can't find item");
                }
                
                
            }
            else {
                _response.write("error");


            }
            //console.log(responseBody);
            _response.write(JSON.stringify(responseBody));
            //_response.end();


            /*
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
            }*/

            //console.log("qdata.email:" + qdata.email);
            //console.log("email:" + email);
            //let orders: Promise<Mongo.Collection> = connectDB();
            //let orders: string = "testtest";
            //_response.write(JSON.stringify(await result.toArray()));
            //_response.write(JSON.stringify(responseBody));
        }

        //_response.write("Testst");
        _response.end();
    }
}

async function connectDB(_collection: string): Promise<Mongo.Collection> {
    let _url: string = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    return mongoClient.db("Klausur").collection(_collection);
}

async function findAndSetUser(_element: string, _userId: string, _items: Mongo.Collection): Promise<void> {

    await _items.updateOne({ name: _element }, {
        $set: {
        user: _userId,
        status: "2"
    }
        
    });
}

async function changeItemState(_element: string, _state: number, _items: Mongo.Collection): Promise<void> {
    await _items.updateOne({ name: _element }, {
        $set: {
        status: String(_state)
    }
        
    });
    console.log(_element + " " + _state);
}
