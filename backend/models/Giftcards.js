// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

const mongoose = require('mongoose')

const giftcardSchema = new mongoose.Schema({
    giftcardName: String,
    giftcardBrand: String,
    giftcardCategory: String,
    giftcardPrice: Number,
    giftcardDescription: String,
    giftcardImage: String,
    createdDate: Date,
    // updatedDate: Date,
})

const giftcards = mongoose.model("giftcards", giftcardSchema);
module.exports = giftcards;