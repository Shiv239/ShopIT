const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://nirav:Assignment3!@cluster0.dmey5jx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
client.connect().then(() => console.log("Connected"));
const database = client.db("shopit");
const orders = database.collection("orders");

console.log("Past Orders");
let id = null;
const past_order = async (req,res) =>{
    id = req.body.user_id;
    console.log("User Id: ",id)

    orders.find({user_id:id}).toArray(function (err, result) {
        if (err) {
            console.log(err);
            res.send(400);
        } else {
            console.log("Orders retrieving.... : ", result);
            res.send(result);
        }
    });
}

const p_order = {past_order}
module.exports= p_order;