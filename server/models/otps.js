const mongoose=require('mongoose');
const mailSender=require('../utils/mailSender');

const otpSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:10*60*1000       //expires in 10 minutes
    }
});

// Pre hook to be stated before model and after schema definition
// a function to send emails
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email from CodeNova",otp);
        console.log("Email sent Successfully:",mailResponse);
    }catch(error){
        console.log("error occured while sending mails",error);
        throw error;
    }
}
otpSchema.pre("save", async function (next) {
    try {
        await sendVerificationEmail(this.email, this.otp);
        next();
    } catch (error) {
        console.log("Error occurred while sending emails", error);
        next(error);
    }
});

module.exports=mongoose.model("otps",otpSchema);