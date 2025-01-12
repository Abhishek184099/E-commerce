const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateTokenAndSetCookie = require("../utilis/generateToken");

const signup = async (req, res) => {
    try {
        const { fullName, email, password, role  } = req.body;

     
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'email already exist' })
        }
        //hash password
        let hashedPassword = await bcrypt.hash(password, 10);

        const profilePic = `https://avatar.iran.liara.run/public/boy?username=${fullName}`


        const newUser = new User({
            fullName, 
            email,
            password: hashedPassword,
            role : role,
            profilePic,
        })


        //genereate token and set cookies
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save()

            res.status(200).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                profilePic: newUser.profilePic,
            })
        }
        else {
			res.status(400).json({ error: "Invalid user data" });
        }

    } catch (err) {
        console.error("error in signup controller :", err.message)
        res.status(500).json({ error: "validaiton error" })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })


        if (user) {
            let matched = await bcrypt.compare(password, user?.password || "")
            if (matched) {
                await generateTokenAndSetCookie(user._id, res);
                return res.status(200).json({
                    fullName: user.fullName,
                    email : user.email,
                    _id: user._id,
                    role : user.role,
                    profilePic : user.profilePic,
                })
            }
        }
        return res.status(400).json({ error: 'invalid credential' })

    } catch (err) {
        console.log("Error in login controller", err.message);
        res.status(500).json({ error: "Internal server error" })
    }
}
const logout = async (req, res) => {
    try {
        res.cookie("jwt", '', { maxAge: 0 })
        res.status(200).json("user logged out successfully")
    } catch (err) {
        console.error("error in logout controller :", err.message)
    }
}

module.exports = {
    signup, login, logout,
} 