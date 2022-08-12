const express = require("express");
const wishlistModel = require("../models/wishlistModel");
const { v4: uuidv4 } = require('uuid');

const getWishlist = async (req, res) => {
    const user_id = req.query.email
    const wishList = await wishlistModel.find({})
    console.log(wishList)
    const result = wishList.filter((item) => {
        return item['user_id'] === user_id;
    })
    if (wishList == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }
    try {
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const addWishlist = async (req,res) => {
    const user_id = req.body.email
    const prod_id = req.body.product_id
    const prod = req.body.product

    var newWishlist = new wishlistModel({
            image: prod.productImage,
            user_id: user_id,
            prod_id: prod_id,
            name: prod.productName,
            price: prod.productPrice,
            description: prod.productDescription,
            category: prod.productImage,
    })
    await newWishlist.save(function(err,wish){
        if(err) return console.error(err);
        console.log(wish.name + " saved to wishlist.");
    })
    return res.status(200).send({ wishlistItem:  newWishlist});

}
const controller = { getWishlist, addWishlist };

module.exports = controller;
