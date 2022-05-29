const Poin = require('../models/poin');
// const Pengguna = require('../models/pengguna');
const User = require('../models/user')
// const getPoinById = async (req, res, next) => {
//     try{
//         const { userId } = req.params;
//         const pengguna = await Pengguna.findById(userId).populate('poinku')
//         res.status(200).send(pengguna);
//     }catch(error) {
//         res.status(400).send(error.message);
//     }
// }

const getPoinById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('poinku')
        res.status(200).send(user);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getOnePoinById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('poinku')
        res.status(200).send(user.poinku.sort());
    }catch(error) {
        res.status(400).send(error.message);
    }
}


// const postPoinById = async (req, res, next) => {
//     const { userId } = req.params;
//     // Create a new car
//     const newPoin = new Poin(req.body);
//     // Get userId
//     const pengguna = await Pengguna.findById(userId);
//     // Assign poin as a Car's seller
//     newPoin.pengguna = pengguna;
//     // save the poin
//     await newPoin.save();
//     // add car to the user's selling array
//     pengguna.poinku.push(newPoin);
//     // save the user
//     await pengguna.save();
//     res.status(201).json(newPoin);
// }

const postPoinById = async (req, res, next) => {
    const { userId } = req.params;
    // Create a new car
    const newPoin = new Poin(req.body);
    // Get userId
    const user = await User.findById(userId);
    // Assign poin as a Car's seller
    newPoin.pengguna = user;
    // save the poin
    await newPoin.save();
    // add car to the user's selling array
    user.poinku.push(newPoin);
    // save the user
    await user.save();
    res.status(201).json(newPoin);
}
const postPenggunaBaru = async (req, res, next) => {
    const newPengguna = new Pengguna(req.body);
    const pengguna = await newPengguna.save()
    res.status(201).json(pengguna)
}

const getPengguna = async (req, res, next) => {
    const pengguna = await Pengguna.find({});
    res.status(200).json(pengguna)
}

module.exports = {getPoinById, 
    postPoinById, 
    postPenggunaBaru,
    getPengguna,
    getOnePoinById
}
