const Poin = require('../models/poin');
const User = require('../models/user')

const getHistoryPoinById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('historypoint')
        // res.status(200).send(user.historypoint.sort((a, b) => b.start_date - a.start_date));
        res.status(200).json({
            message: 'success',
            historyPoint: user.historypoint.sort((a, b) => b.start_date - a.start_date),
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const postHistoryPoinById = async (req, res, next) => {
    try {
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
        user.historypoint.push(newPoin);
        // save the user
        await user.save();
        res.status(201).json({
            message: 'success',
        })
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {getHistoryPoinById, 
    postHistoryPoinById,
}
