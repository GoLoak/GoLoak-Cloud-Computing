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


module.exports = {getUserById}