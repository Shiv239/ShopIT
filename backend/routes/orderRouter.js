const express = require("express");
const orderController = require("../controllers/orderController");
var router = express.Router();

router.get("/order/get/:email?", orderController.getOrders);
router.post("/order/archive", orderController.archiveOrders);
router.post("/order/add", orderController.addOrder);
// router.get("/order/update/:id", orderController.updateOrder);
module.exports = router;