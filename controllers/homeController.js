const User = require('../models/user')
const Trash = require('../models/trash')

const homeUserById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId)
        const trash = await Trash.find({})
        res.status(200).json({
            message: 'success',
            fullname: user.fullname,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            point: user.point,
            listTrash: trash
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}


module.exports = {homeUserById}