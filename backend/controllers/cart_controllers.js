const express = require("express");
const CartModel = require("../models/cart_model");

/**
 * This function adds a new product into a cart. This functionality is available to the users who are registered with our website.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function addToCart(req, res) {
    try {
        const userid = req.body.user_id
        const cart = await CartModel.findOne({ user_id: userid })
        let products = req.body.product
        console.log(products);
        const pid = products._id
        const pname = products.productName
        const pprice = products.productPrice
        const image = products.productImage
        const pquantity = 1
        if (!cart) {
            const new_cart_obj = await CartModel.create({
                user_id: userid,
                product: [
                    {
                        product_id: pid, product_name: pname, product_price: pprice, product_quantity: pquantity, productImage:image,size:products.productSize

                    }
                ],
                coupon: "SHOPITNEW"
            })
            return res.status(201).json({
                "cart": new_cart_obj
            })
        } else {
            cart.product.push({
                product_id: pid, product_name: pname, product_price: pprice, product_quantity: pquantity, productImage:image,size:products.productSize
            })
            await cart.save()
            return res.status(200).json({
                "cart": cart
            })

        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })
    }
}
async function getCart(req,res)
{
    try{
        const email = req.body.email
        const cart = await CartModel.findOne({user_id:email})
        // console.log(cart);
        if(cart){
            return res.status(200).json({
                "data":cart
            })
        }
        return res.status(200).json({
            "data":{
                product:[],
                coupon:""
            }
        }) 
    }
    catch(err){
        console.log("this is error",err);
        return res.status(500).json({
            "message": "Something went wrong"
        })
    }
}
async function increasceQuantity(req,res){
    try{
        const email = req.body.email
        const index = req.body.index;
        var cart = await CartModel.findOneAndUpdate({ user_id:email});
        cart.product[index].product_quantity += 1;
        await cart.save()
        return res.status(200).send({ cart: cart });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })

    }
}

async function decreasceQuantity(req,res){
    try{
        const email = req.body.email
        const index = req.body.index;
        var cart = await CartModel.findOneAndUpdate({ user_id:email});
        const product = cart.product[index]
        product.product_quantity=product.product_quantity-1;
        if(product.product_quantity<=0){
            cart.product.splice(index, 1);
        }
        await cart.save()
        return res.status(200).send({ cart: cart });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })

    }
}
async function removeAll(req,res){
    var cart = await CartModel.deleteMany({}).then(function(){
        console.log("Data deleted"); // Success
        console.log(cart)
        res.send({cart:cart})
    }).catch(function(error){
        console.log(error); // Failure
    });
}

async function removeProduct(req,res){
    try{
        const email = req.body.email
        const index = req.body.index;
        var cart = await CartModel.findOneAndUpdate({ user_id:email});
        cart.product.splice(index, 1);
        await cart.save()
        return res.status(200).send({ cart: cart });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            "message": "something went wrong"
        })

    }
}

module.exports = { addToCart, getCart, decreasceQuantity, increasceQuantity,removeProduct,removeAll}