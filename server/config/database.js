const mongoose= require('mongoose');
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("DATABASE CONNECTED SUCCESSFULLY")})
    .catch((error)=>{
        console.log("DATABASE CONNECTION FAILED");
        console.error(error);
        process.exit(1);
    })
}
module.exports=dbConnect;