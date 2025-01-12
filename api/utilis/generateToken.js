const jwt = require('jsonwebtoken')

require('dotenv').config()

const generateTokenAndSetCookie = async(userId,res) => {
     
    try{
        const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn : "15d",});
         res.cookie("jwt",token,{
            maxAge : 15 *24*60*60*1000, //MS
            httpOnly :true, 
            sameSite : "strict", 
            secure : false,
        }) 
    }
    catch(err){
        res.status(400).json(err.message)
    }
}

module.exports = generateTokenAndSetCookie