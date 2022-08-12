var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
    user_id: String,
    product:[
        {
            product_id: {type: String,  required: [true, 'Missing required value']},
            product_name: { type: String, required: [true, 'Missing required value'] },
            product_price: { type: Number, required: [true, 'Missing required value '] },
            product_quantity: Number,
            productImage: String,
            size: String
            
        }
    ],
    coupon:String
});

const CartModel = mongoose.model('Cart', CartSchema);

module.exports = CartModel;
