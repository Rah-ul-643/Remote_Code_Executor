// user authentication 
const users= require('../models/users');
const bcrypt= require('bcrypt');
const jwt= require("jsonwebtoken");
require('dotenv').config();
const secret_key = process.env.ACCESS_TOKEN_SECRET_KEY;

const generateToken= (firstName,lastName,username)=>{
    const user={firstName: firstName,lastName:lastName, username: username};

    const token= jwt.sign(user,secret_key,{expiresIn: "2 days"});      // implement refresh token as well 
    return token;
}

const loginUser= async (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;

    if(!username || !password){
        console.log("Please enter username and password");
        res.status(403).redirect('/login');
    }

    const user= await users.findOne({username:username});

    if (user){

        if(await bcrypt.compare(password,user.password)){
            console.log("user logged in");
            const token= generateToken(user.firstName,user.lastName,user.username);
            res.cookie('jwt',token, {httpOnly:true} );
            res.status(200).redirect('/');
        }
        else{
            console.log("Password Incorrect");
            res.status(403).redirect('/login');
        }
        
    }

    else{
        console.log("User does not exist. Signup Instead?");
        res.status(403).redirect('/register');
    }
    
}


module.exports= {generateToken,loginUser};