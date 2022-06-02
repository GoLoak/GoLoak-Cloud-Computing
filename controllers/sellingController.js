const Selling = require('../models/selling');
const User = require('../models/user');

const getSellingById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('penjualanku')
        // res.status(200).send(user.penjualanku.sort((a, b) => b.start_date - a.start_date))
        res.status(200).json({
            message: 'success',
            listSelling: user.penjualanku.sort((a, b) => b.createAt - a.createAt),
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const postSellingById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        // Buat menyimpan penjualan baru
        const newPenjualan = new Selling(req.body);
        // Berdasarkan user Id
        const user = await User.findById(userId);
        // menetapkan db selling sebagai pengguna di db user
        newPenjualan.pengguna = user;
        // menyimpan penjualan
        await newPenjualan.save();
        // menambahkan db user di field sebagai new penjualan
        user.penjualanku.push(newPenjualan);
        // simpan user
        await user.save();
        res.status(201).json({
            message: 'success',
        })
        
    }catch(error) {
        res.status(400).send(error.message);
    }

}

module.exports = {
    getSellingById,
    postSellingById,
}