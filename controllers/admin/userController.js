const User = require('../../models/user');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find({});
        res.status(200).json({
            message: 'success',
            listUser: user,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const userFindById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json({
            message: 'success',
            user: user,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const userUpdateById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { fullname, email, password, phone_number, address, point, status } = req.body;

        if(password) {
            const hashPass = await bcrypt.hash(password, 12);
            const user = await User.findByIdAndUpdate(userId, {
                fullname,
                email,
                password : hashPass,
                phone_number,
                address,
                point,
                status,
            });
            res.status(200).json({
                message: 'success'
            })
            
        }else {
            const user = await User.findByIdAndUpdate(userId, {
                fullname,
                email,
                phone_number,
                address,
                point,
                status,
            });
            res.status(200).json({
                message: 'success'
            })
            
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const userDeleteById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findByIdAndDelete(userId);
        res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllUser,
    userFindById,
    userUpdateById,
    userDeleteById,
}
