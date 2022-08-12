const express = require("express");
const wishlistController = require("../controllers/wishlistController");
var router = express.Router();

router.get("/wishlist/get", wishlistController.getWishlist);
router.post("/wishlist/add", wishlistController.addWishlist);
module.exports = router;