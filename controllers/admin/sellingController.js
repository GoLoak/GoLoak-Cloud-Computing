const Selling = require('../../models/selling');
const User = require('../../models/user');

const getAllSelling = async (req, res, next) => {
    try {
        const selling = await Selling.find({});
        res.status(200).json({
            message: 'success',
            listSelling: selling,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const sellingFindById = async (req, res, next) => {
    try {
        const { sellingId } = req.params;
        const sell = await Selling.findById(sellingId);
        res.status(200).json({
            message: 'success',
            trash: sell,
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const sellingUpdateById = async (req, res, next) => {
    try {
        const { sellingId } = req.params;
        const { total_trash, total_point, status, nameTrash } = req.body;
        const sell = await Selling.findByIdAndUpdate(sellingId, {
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

const sellingDeleteById = async (req, res, next) => {
    try {
        const { sellingId } = req.params;
        const sell = await Selling.findByIdAndDelete(sellingId);
        res.status(200).json({
            message: 'success'
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllSelling,
    sellingFindById,
    sellingUpdateById,
    sellingDeleteById,
}
