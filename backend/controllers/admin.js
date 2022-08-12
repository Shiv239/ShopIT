const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://nirav:Assignment3!@cluster0.dmey5jx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => console.log("Connected"));
const database = client.db("shopit");
const users = database.collection("users");
console.log("Admin...");
const list = async (req, res) => {
    users.find({}).toArray(function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(JSON.stringify(result));
        }
    });
};

const delete_user = async (req) =>{
    console.log(req.body);
    users.deleteOne({"id": req.body.id}).then(() => console.log("Deleted..."));
 }

const user = {list,delete_user}
module.exports = user;