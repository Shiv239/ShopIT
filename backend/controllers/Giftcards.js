// Author : [Tejaswini Rallapali](sr805848@dal.ca) 

const GiftcardModel = require('../models/Giftcards')
const addGiftcard = async (req, res) => {
   

    var createdDate = new Date()

    const giftcard = new GiftcardModel({
        giftcardName: req.body.giftcardName,
        giftcardBrand: req.body.giftcardBrand,
        giftcardCategory: req.body.giftcardCategory,
        giftcardPrice: req.body.giftcardPrice,
        giftcardDescription: req.body.giftcardDescription,
        giftcardImage: req.body.giftcardImage,
        createdDate: createdDate,
    })
    
    await giftcard.save();
    res.send(giftcard)
}

const fetchAllGiftcards = async (req, res) => {
    GiftcardModel.find({}, function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result)
        res.json(result);
    });
};

const fetchGiftcardByGiftcardID = async (req, res) => {
    const _id  = req.params.id;
    console.log(req.params.id )

    GiftcardModel.find({_id}, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};



module.exports = { addGiftcard, fetchAllGiftcards, fetchGiftcardByGiftcardID }