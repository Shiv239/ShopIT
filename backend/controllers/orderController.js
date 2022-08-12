const express = require("express");
const orderModel = require("../models/orderModel");
const { v4: uuidv4 } = require('uuid');
const ProductModel = require('../models/Products')
const GiftcardModel = require('../models/Giftcards')

/**
 * This function adds a new order into the db. This functionality is available to the users who are registered with our website.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */



const getOrders = async (req, res) => {
    const user_id = req.query.email
    const orders = await orderModel.find({})
    const result = orders.filter((item) => {
        return item['user_id'] === user_id;
    })
    if (orders == null) {
        return res.status(401).send({ error: true, msg: 'User data missing' })
    }
    try {
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getTodayDate = () => {
    const today = new Date()
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    return day + "/" + month + "/" + year;
}
const getTotalPrice = async (products) => {
    var total = 0
    // console.log(products)
    for (const prod of products) {
        total = total + prod.price
    }
    console.log(total.toString())
    return "CDN$ "+total.toString();
}
const getProducts = async (prods) => {
    var res = []
    for (const prod of prods) {
        if (prod.product_name === "gift card") {
            const giftcard = await GiftcardModel.findOne({ _id: prod.product_id })
            console.log(giftcard)
            res.push({
                id: prod.product_id,
                name: giftcard.giftcardName,
                image: giftcard.giftcardImage,
                price: giftcard.giftcardPrice
            })
        }
        else {
            const product = await ProductModel.findOne({ _id: prod.product_id })
            console.log(product)
            res.push({
                id: prod.product_id,
                name: product.productName,
                image: product.productImage,
                price: product.productPrice
            })
        }
    }
    return res
}
const addOrder = async (req, res) => {
    const user_id = req.body.user_id
    const prods = req.body.product
    const products = await getProducts(prods)
    const totalPrice = await getTotalPrice(products)
    var newOrder = new orderModel({
        status: "pending",
        user_id: user_id,
        date: getTodayDate(),
        price: totalPrice,
        number: uuidv4(),
        delivery: "Delivery Pending",
        product: products
    })
    await newOrder.save(function (err, order) {
        if (err) return console.error(err);
        console.log(order.number + " saved to order to collection.");
    })
    return res.status(200).send({ order: newOrder });
}

const archiveOrders = async (req, res) => {
    try {
        console.log(req)
        const order_id = req.body.order.number
        console.log(order_id)
        var newOrder = {
            status: "archived",
            user_id: req.body.order.user_id,
            date: req.body.order.date,
            price: req.body.order.price,
            number: req.body.order.number,
            delivery: req.body.order.delivery,
            product: req.body.order.product
        }
        var order = await orderModel.findOneAndUpdate({ number: order_id }, newOrder, { overwrite: true })
        console.log(order)
        await order.save()
        return res.status(200).send({ order: order });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
}

const controller = { getOrders, archiveOrders, addOrder };

module.exports = controller;