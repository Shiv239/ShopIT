var mongoose = require('mongoose');
const WishlistSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    user_id: {
        type: String,
    },
    prod_id: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },

});

const Wishlist = mongoose.model("wishList", WishlistSchema);

module.exports = Wishlist;