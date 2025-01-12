const express = require("express");
const router = express.Router();

const { protectRoute } = require("../middleware/auth.middleware");
const {getAllProduct, uploadProduct, getAdminProduct, deleteProduct, updateProduct, getproductById,} = require("../controllers/product.controller")



router.get('/getproduct',getAllProduct);
router.post('/uploadproduct',protectRoute,uploadProduct );
router.get("/adminproduct",protectRoute,getAdminProduct)
router.get("/getbyid/:id",protectRoute,getproductById)
router.delete('/delete/:id',protectRoute,deleteProduct)
router.put('/update/:id',protectRoute,updateProduct)


module.exports = router; 
