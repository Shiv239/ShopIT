var mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    status: {
        type: String,
        // required: true,
    },
    user_id: {
        type: String,
        // required: true
    },
    date: {
        type: String,
        // required: true
    },
    product: [
        {
            id: { type: String, required: [true, 'Missing required value'] },
            name: { type: String, required: [true, 'Missing required value'] },
            image: { type: String, required: [true, 'Missing required value'] },
            price: { type: String, required: [true, 'Missing required value '] },
            product_quantity: Number
        }
    ],
    price: {
        type: String,
        // required: true,
    },
    number: {
        type: String,
        // required: true
    },
    delivery: {
        type: String,
        // required: true,
    },
    // title: {
    //     type: String,
    //     required: true,
    // },
    // image: {
    //     type: String,
    //     required: true
    // },

});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;