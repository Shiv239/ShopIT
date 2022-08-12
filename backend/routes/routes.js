const express = require("express");
const orderController = require("../controllers/orderController");
const admin = require("../controllers/admin")
const single = require("../controllers/single_user")
const past = require("../controllers/past_orders")
const router = express.Router();

router.get("/order/get", orderController.getOrders);
router.get("/admin", admin.list);
router.post("/delete", admin.delete_user);
router.post("/view",single.view);
router.post("/past",past.past_order);
module.exports = router;