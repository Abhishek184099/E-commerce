    const cloudinary = require("cloudinary").v2;
    const fs = require("fs");

    cloudinary.config({
        cloud_name : "dzrkmohhz",
        api_key : "927648859464381",
        api_secret : "j19gRCVuDh9yuObQz_VQw70Fy0o",
    });

    exports.uploadCloudinary = async(localFilePath)=>{
        try{
            if(!localFilePath) return null;
            const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type : "auto",
            });
            return response;
        }
        catch(err){
            fs.unlinkSync(localFilePath); 
            return null;
        }    

    }