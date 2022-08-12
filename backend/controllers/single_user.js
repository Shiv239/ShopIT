const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://nirav:Assignment3!@cluster0.dmey5jx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => console.log("Connected"));
const database = client.db("shopit");
const user_info = database.collection("users");
const orders = database.collection("orders");

const a = "World!";
console.log("Single User");
let id = null;
const view = async (req,res) =>{
    console.log("Hello"+a);
    id = req.body.user_email_id;
    console.log("User Id: ",id)

    user_info.findOne({user_email_id:id},function (err, docs) {
        if (err){
            console.log(err);
            res.send(400);
        }
        else{
            console.log("User retrieving.... : ", docs);
            res.send(docs);
        }
    });
}

const single = {view}
module.exports= single;