const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const User = require('../models/user.js');
const mongoose = require('mongoose');

const router = express.Router();
// const url = "    ";
const url = "https://goloak.herokuapp.com/auth/reset-password/";

router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;
        const user = await User.findOne({
            email
        }).lean();

        if (!user) {
            return res.json({
                message: 'Invalid email/password'
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match || email !== user.email) {
            return res.json({
                message: 'Invalid email/password'
            });
        }

        const token = jwt.sign({
                id: user._id,
                email: email
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

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

router.post("/signup", async (req, res) => {

    try {
        const {
            fullname,
            password,
            email,
            phone_number,
            address
        } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.create({
            fullname: fullname,
            email: email,
            phone_number: phone_number,
            address: address,
            password: hashedPassword
        });

        res.status(201).json({
            message: "success"
        });

    } catch (error) {
        if (error.code === 11000) {
            // duplicate key
            return res.json({
                message: 'Email already exists'
            });
        }
        res.status(500).json({
            message: error.message
        });
    }
})

router.post("/reset-password", async (req, res) => {

    try {
        const {
            id,
            email,
            password
        } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.json({
                message: 'check your verification link'
            });
        }

        const user = await User.findById(id);
        if (!user || user.email !== email) {
            return res.json({
                message: 'link could not be found'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            message: "success"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
})

router.post('/forgot', async (req, res) => {

    try {
        const email = req.body.email;
        const user = await User.findOne({
            email
        }).lean()

        if (!user) {
            return res.json({
                message: 'please cek your email'
            });
        }

        const html = `
            <h3>Hello , </h3>
            <p>Please click on the link below to reset your password for ${email}.</p>
            <p>Reset Link: ${url + user._id + "/" + user.email}</p>
            <br/>
            <p> If you didn't request this, please ignore this email.</p>
            <p>Thank You</p>
        `

        let mailTransporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port:465,
            secure:true,
            auth: {
                user: process.env.Email,
                pass: process.env.VMEET_PASS
            }
        });

        let mailDetails = {
            from: 'no-reply GoLoak',
            to: email,
            subject: 'Password Change',
            html: html
        };

        await mailTransporter.sendMail(mailDetails);
        res.status(200).send({
            message: 'ok'
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

router.post('/authorize', async (req, res) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
            return res.json({
                message: 'no'
            });
        }

        const user = await User.findById(decoded.id);
        if (!user || user.email !== decoded.email) {
            return res.json({
                message: 'no'
            });
        }

        return res.json({
            message: 'yes'
        });
    } catch (err) {
        res.json({
            message: 'no',
            error: err.message
        });
    }
});


module.exports = router;