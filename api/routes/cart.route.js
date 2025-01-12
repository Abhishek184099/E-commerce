const express = require("express");
const router = express.Router();

const {addToCart,getCart,emptyCart, removeCart} = require("../controllers/cart.controller");
const { protectRoute } = require("../middleware/auth.middleware");

router.post('/add/:id',protectRoute,addToCart);
router.get("/getcart",protectRoute,getCart)
router.delete("/emptycart",protectRoute,emptyCart);
router.delete("/delete/:id",protectRoute,removeCart);

module.exports = router;