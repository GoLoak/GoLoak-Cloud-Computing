const User = require('../models/user')

const getUserById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId)
        res.status(200).json({
            message: 'success',
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            point: user.point,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const newUser = req.body;
        const user = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({
            message: 'success',
            newUser: newUser
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
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
    getUserById,
    updateUser,
    deleteUser,
}