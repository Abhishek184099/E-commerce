const express = require("express");
const { createOrder, getOrders } = require("../controllers/order.controller");
const { protectRoute } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/create",protectRoute,createOrder);
router.get("/getorders",protectRoute,getOrders);




module.exports = router;