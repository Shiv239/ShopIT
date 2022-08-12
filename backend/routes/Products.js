/* Author: Lavita Pereira */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/Products');

router.post('/addproduct', productController.addProduct)
router.get("/fetchProducts", productController.fetchAllProducts);
router.get('/fetchProductByProductID/:id?', productController.fetchProductByProductID)

module.exports = router