/* Author: Lavita Pereira */
const ProductModel = require('../models/Products')

const addProduct = async (req, res) => {

    var createdDate = new Date()

    const product = new ProductModel({
        productName: req.body.productName,
        productBrand: req.body.productBrand,
        productCategory: req.body.productCategory,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productImage: req.body.productImage,
        createdDate: createdDate,
        size: req.body.size,
    })

    await product.save();
    res.send(product)
}

const fetchAllProducts = async (req, res) => {
    ProductModel.find({}, function (err, result) {
        if (err) {
            res.send(err);
        }
        // console.log("products:",result)
        res.json(result);
    });
};

const fetchProductByProductID = async (req, res) => {
    const _id  = req.params.id;
    
    ProductModel.find({_id}, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

module.exports = { addProduct, fetchAllProducts, fetchProductByProductID }





