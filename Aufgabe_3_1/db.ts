
import * as Mongo from "mongodb";

async function connectMDB(): Promise<void> {
    console.log("Waiting");
    let _url: string = "mongodb+srv://dbUser:dbUserPass21@meingiscluster.x6hud.mongodb.net/Test?retryWrites=true&w=majority";
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url);
    await mongoClient.connect();
    console.log("Success");
    let orders: Mongo.Collection = mongoClient.db("Test").collection("Students");
    console.log(orders);
}
console.log("Test");
connectMDB();