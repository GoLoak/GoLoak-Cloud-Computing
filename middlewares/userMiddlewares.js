const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const loginUser = async (req, res, next) => {
    const { email,  password } = req.body;

    try {
        const user = await User.findOne({ email });

        const comp = await bcrypt.compare(password, user.password);
        
        if(user.email !== email) {
            return res.status(403).json({
                message: "Please check your email"
            });
        } else if(comp === false) {
            return res.status(403).json({
                message: "Please check your password"
            });
        } else {
            const token = jwt.sign({
                    id: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            return res.status(200).json({
                message: "success",
                id: user._id,
                token: token
            });
        } 
        
    } catch (error) {
        return res.status(500).json({
            message: "Please check your credentials"
        });
    }
}

const signupUser = async (req, res, next) => {
    const {
        fullname,
        password,
        email,
        phone_number,
        address
    } = req.body;

    try {
        const hashPass = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            fullname,
            email,
            phone_number,
            address,
            password: hashPass
        });

        res.status(201).json({
            message: "success",
            user: newUser.fullname
        })
    } catch (error) {
        if(error.code === 11000) {
            return res.status(409).json({
                message: "Email already exists"
            });
        }
        res.status(500).json({
            message: error.message
        })
    }
}

const forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({
                message: "Please check your email"
            });
        }

        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: "20m"
        });

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.GMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: 'NO-REPLY',
            to: user.email,
            subject: "Reset your password",
            html: `
            <div>
                <h1>Reset your password</h1>
                <p>Click the link below to reset your password</p>
                <p>This link will expire in 20 minutes</p>
                <a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password</a>
                <p>or</>
                <a href="${process.env.CLIENT_URL}/reset-password/${token}">${process.env.CLIENT_URL}/reset-password/${token}</a>
                <p>Thank you</p>
            </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            return res.status(200).json({
                message: "success"
            });
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const resetPassword = async (req, res, next) => {
    const { password } = req.body;
    const { token } = req.params;

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ email: verify.email });

        if(!user) {
            return res.status(404).json({
                message: "Please check your email"
            });
        }

        const hashPass = await bcrypt.hash(password, 12);

        await User.findOneAndUpdate({ _id: user._id }, { password: hashPass });

        return res.status(200).json({
            message: "success"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

const authorizeUser = async (req, res, next) => {
    const { token } = req.headers;

    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: verify.id });

        if(!user) {
            return res.status(403).json({
                message: "Please check your credentials"
            });
        }

        return next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    loginUser,
    signupUser,
    forgotPassword,
    resetPassword,
    authorizeUser,
};