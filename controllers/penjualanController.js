const Selling = require('../models/penjualan');
const User = require('../models/user');

const getPenjualanById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('penjualanku')
        res.status(200).send(user);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const postPoinById = async (req, res, next) => {
    const { userId } = req.params;
    // Create a new car
    const newPenjualan = new Selling(req.body);
    // Get userId
    const user = await User.findById(userId);
    // Assign poin as a Car's seller
    newPenjualan.pengguna = user;
    // save the poin
    await newPenjualan.save();
    // add car to the user's selling array
    user.penjualanku.push(newPenjualan);
    // save the user
    await user.save();
    res.status(201).json(newPenjualan);
}

module.exports = {
    getPenjualanById,
    postPoinById,
}