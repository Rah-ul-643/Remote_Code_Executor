const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../models/users');
const secretKey = process.env.JWT_SECRET_KEY;

const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {

        const user = await users.findOne({ username: username });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                console.log("authenticted");
                const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
                res.cookie('token', token,
                    {
                        httpOnly: true,
                        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
                        secure: true, // Use `secure: true` in production
                        sameSite: 'None',  // Allow cross-origin
                    }
                );
                res.json({ token: token, success: true, message: "Logged in successfully" });
            }
            else
                res.json({ success: false, message: "Incorrect Password" });
        }

        else res.json({ success: false, message: "User does not exist" });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

const registerController = async (req, res) => {
    console.log("registration api hit");
    const { name, username, password } = req.body;
    try {
        const user = await users.findOne({ username: username });
        if (!user) {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const newUser = new users({ name, username, password: encryptedPassword });
            await newUser.save();

            console.log("New user created.");

            res.json({ success: true, message: "Registered successfully" });
        }
        else {
            res.json({ success: false, message: "Username already in use" });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }

}

module.exports = { loginController, registerController };