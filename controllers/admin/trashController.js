const Trash = require('../../models/trash');

const getAllTrash = async (req, res, next) => {
    try {
        const trash = await Trash.find({});
        res.status(200).json({
            message: 'success',
            listTrash: trash,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const trashFindById = async (req, res, next) => {
    try {
        const { trashId } = req.params;
        const trash = await Trash.findById(trashId);
        res.status(200).json({
            message: 'success',
            trash: trash,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const trashUpdateById = async (req, res, next) => {
    try {
        const { trashId } = req.params;
        const { name, type, description, price } = req.body;
        const trash = await Trash.findByIdAndUpdate(trashId, {
            name,
            type,
            description,
            price,
        });
        res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const trashDeleteById = async (req, res, next) => {
    try {
        const { trashId } = req.params;
        const trash = await Trash.findByIdAndDelete(trashId);
        res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllTrash,
    trashFindById,
    trashUpdateById,
    trashDeleteById
}