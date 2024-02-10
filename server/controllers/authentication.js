// user authentication 
const users= require('../models/users');
const bcrypt= require('bcrypt');
const jwt= require("jsonwebtoken");
require('dotenv').config();
const secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;

const generateToken= (firstName,lastName,email)=>{
    const user={firstName: firstName,lastName:lastName, email: email};

    const token= jwt.sign(user,secret_key,{expiresIn: "2 days"});      // implement refresh token as well 
    return token;
}

const loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        console.log("Please enter email and password");
        return res.status(403).json({ message: "Please enter email and password" });
    }

    const user = await users.findOne({ email: email });

    if (user) {
        if (await bcrypt.compare(password, user.password)) {
            console.log("user logged in");
            const token = generateToken(user.firstName, user.lastName, user.email);
            res.cookie('jwt', token, { httpOnly: true });
            return res.status(200).json({
                sucess: true,
                message: "User logged in",
            });
        } else {
            console.log("Password Incorrect");
            return res.status(403).json({ message: "Password Incorrect" });
        }
    } else {
        console.log("User does not exist. Signup Instead?");
        return res.status(403).json({ message: "User does not exist. Signup Instead?" });
    }

    
}


module.exports= {generateToken,loginUser};