const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY; 

const auth = (req,res,next) => {
    const token = req.cookies.token;

    if (!token){
        console.log('Expired Token');        
        res.status(401).json({message:"Token Expired!"});
    }
    else{
        jwt.verify(token,secretKey,(err, decoded)=>{
            if (err){
                console.log('invalid token');
                res.clearCookie('token', {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                });
                res.status(401).json({message: "Unauthorized access!"});
            }
            else{
                req.username = decoded.username;
                next();
            }
        })

    }
}

module.exports = auth;