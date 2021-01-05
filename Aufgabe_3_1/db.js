"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongo = require("mongodb");
async function connectMDB() {
    console.log("Waiting");
    let _url = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    let orders = mongoClient.db("Test").collection("Students");
    console.log(orders);
}
console.log("Test");
connectMDB();
//# sourceMappingURL=db.js.map