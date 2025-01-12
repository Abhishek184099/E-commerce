const Cart = require("../models/Cart")
const Product = require("../models/Products")

const addToCart = async(req,res) => {

    try{
        const productId = req.params.id;

        const product = await Product.findOne({_id: productId});
        if(product){
            const newCart =  new Cart({
                title : product.title,
                price : product.price,
                image : product.image,
                addBy : req.user._id,
            })
    
            await newCart.save();
            return res.status(200).send(newCart);
        }
    
        return res.status(400).send({error : "product not found"})
    }
   catch(err){
    console.log("error in addtocart controller :",err.message)
    res.status(500).json({error : "Internal server error"})
   }
}

const getCart = async(req,res) => {
    try{
        const cart = await Cart.find({addBy : req.user._id});
        if(cart){
            return res.status(200).json(cart);
        }
        res.status(400).json({error : "no cart products"})
    }
    catch(err){
        console.error("error in getcart controller",err.message)
        res.status(500).json({error : "internal server error"})
    }
} 

const emptyCart = async (req, res) => {
    try {
      if (!req.user || !req.user._id) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const result = await Cart.deleteMany({ addBy: req.user._id });
  
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "products deleted successfully" });
      } else {
        res.status(404).json({ error: "no products found to delete" });
      }
    } catch (err) {
      console.error("error in emptyCart controller", err.message);
      res.status(500).json({ error: "internal server error" });
    }
  };

  const removeCart = async (req, res) => {
    try {
      const productId = req.params.id;
  
      const deletedProduct = await Cart.findByIdAndDelete(productId);
      if (deletedProduct) {
        return res.status(200).json(deletedProduct);
      } else {
        return res.status(404).json({ error: "Product not found" });
      }
    } catch (err) {
      console.error("Error in removeCart controller", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  

module.exports = {
    getCart,
    addToCart,
    emptyCart,
    removeCart,
}