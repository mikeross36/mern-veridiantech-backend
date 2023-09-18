"use strict";
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");

router.use(authController.tokenProtect);

router.post("/create-order", orderController.createOrder);
router.post("/get-user-orders", orderController.getUserOrders);

module.exports = router;
