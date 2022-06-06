const User = require('../../models/user');

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
        const { total_trash, total_point, status, nameTrash } = req.body;
        const user = await User.findByIdAndUpdate(userId, {
            total_point,
            total_trash,
            status,
            nameTrash,
        });
        res.status(200).json({
            message: 'success'
        })
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
