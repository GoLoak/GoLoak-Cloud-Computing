const Selling = require('../models/selling');
const User = require('../models/user');

const getSellingById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('penjualanku')
        res.status(200).send(user.penjualanku.sort((a, b) => b.start_date - a.start_date));
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const postSellingById = async (req, res, next) => {
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
    getSellingById,
    postSellingById,
}