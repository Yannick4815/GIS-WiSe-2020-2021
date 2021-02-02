"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Klausur = void 0;
const Http = require("http");
const Mongo = require("mongodb");
const Url = require("url");
var Klausur;
(function (Klausur) {
    let items;
    let user;
    main();
    async function main() {
        console.log("Starting server");
        let port = Number(process.env.PORT);
        if (!port)
            port = 8100;
        items = await connectDB("Items");
        user = await connectDB("User");
        findAndSetUser("Kamera 1", "600b0d7934383dc921ee36d5", items);
        let server = Http.createServer();
        server.addListener("request", handleRequest);
        server.addListener("listening", handleListen);
        server.listen(port);
    }
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
                _response.write(JSON.stringify(post));
            });
        }
        else {
            //_response.write("Keine POST anfrage");
            let adresse = _request.url;
            let q = Url.parse(adresse, true);
            let qdata = q.query;
            console.log(qdata.requestType);
            let result;
            let resArr;
            let responseBody = { status: "error", message: "" };
            if (qdata.requestType == "getAll") {
                result = items.find({});
                resArr = await result.toArray();
                responseBody.status = "success";
                responseBody.message = JSON.stringify(resArr);
            }
            else if (qdata.requestType == "login" || qdata.requestType == "register") {
                console.log("Reading");
                result = user.find({ email: qdata.email });
                let foundUser = await result.toArray();
                let newUserObj;
                //console.log(await result.toArray());
                let id;
                let userExists;
                let insert = false;
                if (foundUser.length > 0) {
                    userExists = true;
                    console.log("FOUND USER");
                }
                else {
                    userExists = false;
                    console.log("NOT FOUND USER");
                }
                console.log(qdata.requestType);
                if (qdata.requestType == "login") {
                    if (userExists) {
                        if (qdata.pwd == foundUser[0].passwort) {
                            id = foundUser[0]._id;
                            insert = true;
                        }
                        else {
                            responseBody.message = "Falsches Passwort";
                        }
                    }
                    else {
                        responseBody.message = "Kein Konto mit dieser E-Mail gefunden";
                    }
                }
                else {
                    if (!userExists) {
                        let res = await user.insertOne({ vorname: qdata.vorname, nachname: qdata.nachname, email: qdata.email, passwort: qdata.pwd });
                        id = res.insertedId;
                        //let newUser: Mongo.Cursor = user.find({ email: qdata.email });
                        //newUserObj = await newUser.toArray();
                        //console.log("hier");
                        //id = newUserObj[0]._id;
                        insert = true;
                    }
                    else {
                        responseBody.message = "E-Mail wird bereits verwendet!";
                    }
                }
                if (insert) {
                    let itemArr = JSON.parse(String(qdata.items));
                    itemArr.forEach(element => {
                        findAndSetUser(element, id, items);
                    });
                    responseBody.status = "success";
                    responseBody.message = "Vielen Dank für Ihre Reservierung";
                }
                //result = items.find({});
                //
            }
            else if (qdata.requestType == "changeState") {
                changeItemState(String(qdata.element), Number(qdata.state), items);
            }
            else if (qdata.requestType == "findUser") {
                result = user.find({ _id: new Mongo.ObjectId(String(qdata.user)) });
                let foundUser = await result.toArray();
                if (JSON.stringify(foundUser) != "[]") {
                    responseBody.message = foundUser[0].vorname + " " + foundUser[0].nachname;
                }
                else {
                    console.log("cant find user " + qdata.user);
                }
                //console.log(foundUser);
                responseBody.status = "success";
            }
            else if (qdata.requestType == "add") {
                items.insertOne({
                    user: "",
                    name: qdata.name,
                    preis: qdata.preis,
                    status: 1,
                    description: qdata.description,
                    img: qdata.img
                });
                responseBody.status = "success";
            }
            else if (qdata.requestType == "delete") {
                console.log("delete " + qdata.element);
                result = items.find({ _id: new Mongo.ObjectId(String(qdata.element)) });
                let foundItem = await result.toArray();
                if (foundItem.length > 0) {
                    items.deleteOne({ _id: new Mongo.ObjectId(String(foundItem[0]._id)) });
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
})(Klausur = exports.Klausur || (exports.Klausur = {}));
async function connectDB(_collection) {
    let _url = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    return mongoClient.db("Klausur").collection(_collection);
}
async function findAndSetUser(_element, _userId, _items) {
    await _items.updateOne({ name: _element }, {
        $set: {
            user: _userId,
            status: "2"
        }
    });
}
async function changeItemState(_element, _state, _items) {
    await _items.updateOne({ _id: new Mongo.ObjectId(String(_element)) }, {
        $set: {
            status: String(_state)
        }
    });
    console.log(_element + " " + _state);
}
//# sourceMappingURL=server.js.map