const users = require('../models/users');
const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const {otpTemplate} = require('../mail/otpTemplate');
const otps = require('../models/otps');
const uuid = require('uuid');
const mailSender = require('../utils/mailSender');

const createNewUser = async (firstName, lastname, username, password,email) => {

    const encryptedPassword = await bcrypt.hash(password, 10);
    await users.create({ firstName: firstName, lastName: lastname, username: username, password: encryptedPassword, email:email });

    console.log("New user created: " + username);
}
const sendOtp = async (req, res) => {
    try {
        // fetch email from request's body
        const { email } = req.body;

        // check if user already exists
        const user = await users.findOne({ email });

        //if user already exists, then return a response
        if (user) {
            return res.status(401).json({
                success: false,
                message: "User already exists"
            });
        }

        // generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        // generate a unique identifier for the OTP request
        const requestId = uuid.v4();
        // append reuestId to generated otp to ensure it is unique
        otp = `${otp}-${requestId}`

        const otpPayload = { email, otp };
        console.log("OTP Generated:", otp);

        // create otp entry in db
        const otpBody = await otps.create(otpPayload);
        console.log("OTP entry created:", otpBody);

        //return response successful
        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp
        })

        // send otp to user via email
        mailSender(email, "OTP Verification : CodeNova", otpTemplate(otp));

    } catch (error) {
        console.log("Error in sending OTP", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const registerUser = async (req, res) => {

    const { name, username,email, password, password2, otp } = req.body;

    // check if all fields are filled
    if(!name || !username || !password || !password2 || !email || !otp) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    // check if otp is valid
    const otpSent =  otps.findOne({ otp });
    if(!otpSent) {
        return res.status(401).json({
            success: false,
            message: "Invalid OTP"
        })
    }

    // check if user already exists
    const existingUser = await users.findOne({email: email});
    if(existingUser){
        console.log(existingUser);
        return res.status(401).json({
            success: false,
            message: "User already exists"
        })
        
    }

    const nameArr = name.split(" ");
    const firstname = nameArr[0];
    const lastname = nameArr[nameArr.length - 1];

    // implement logic to verify the email as well...by sending a mail using nodeMailer package.

    // check if password matches
    if(password !== password2) {
        return res.status(401).json({
            success: false,
            message: "Passwords do not match"
        })
    }
    // create user
    createNewUser(firstname, lastname, username, password,email);

    return res.status(200).json({
        success: true,
        message: "User created successfully"
    })
   
}

module.exports = { registerUser,sendOtp }