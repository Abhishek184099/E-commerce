const uploadProductPermission = require("../helpers/permission");
const Product = require('../models/Products');
const {uploadCloudinary} = require("../utilis/cloudinary");


const getAllProduct = async(req,res) => {
     try{
            const allProduct = await Product.find().sort({createdAt : -1});
            res.status(200).json(allProduct) 
     }
     catch(err){
         console.log('error in getallproduct controller :',err.message)
         res.status(500).json('internal server error')
     }
}

const getproductById = async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById({_id : id});
        res.status(200).json(product)
    }
    catch(err){
        console.error("error in getproduct buy id: ",err.message);
        res.status(500).json("Internal server error")
    }
}


const uploadProduct = async (req, res) => {
    try {

        const sessionUserId = req.user._id;

        if (!uploadProductPermission(sessionUserId)) {
            return res.status(403).json({ error: "Permission denied" });
        }
       
        let cloudImage = null;
        if (req.files && req.files.image) {
            const imageFile = req.files.image;
            const localFilePath = imageFile.tempFilePath;
            cloudImage = await uploadCloudinary(localFilePath);
        }
       
        const product = new Product({
            ...req.body,
            createdBy: sessionUserId,
            image: cloudImage?.url || ""
        });

        // Save the product to the database
        await product.save();

        // Return the product in the response
        res.status(200).json(product);
    } catch (err) {
        console.error("Error in upload product controller:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


const getAdminProduct = async(req,res) => {
    try{
        const sessionUserId = req.user._id;
        const product = await Product.find({createdBy : sessionUserId});

        if(!product) {
           return  res.status(400).json({ error:"No product is created by admin"})
        }

        res.status(200).json(product);
    }
    catch (err) {
       console.error('error in getAdminProduct controller :',err.message);
       res.status(500).json({error: "Internal server error"});
    }  
}

const deleteProduct = async (req,res) => {
    
  try {
      let matched = await Product.findById(req.params.id);
      if(!matched) {
        return res.status(400).json({error:"NO product found"});
      }

      let product = await Product.findByIdAndDelete(req.params.id);
      res.status(200).json('product is deleted');
  } catch (err) {
    console.error('error in deleteProduct controller :',err.message);
    res.status(500).json({error: "Internal server error"});
  }
    
}
const updateProduct = async (req,res) => {
    try{
        let matched = await Product.findById(req.params.id);
        if(!matched){
            return res.status(400).json({error : "no product found"})
        }

        let product = await Product.findByIdAndUpdate(req.params.id, {
            title : req.body.title,
            price : req.body.price,
            description : req.body.description,
        },{new : true});

        return res.status(200).json(product);

    } 
    catch (err) {
        console.error('error in update controller :',err.message);
        res.status(500).json({error: "Internal server error"});

    }
}  
module.exports = {
    getAllProduct,
    uploadProduct,
    getAdminProduct,
    deleteProduct,
    updateProduct,
    getproductById,
}