'use strict'
const Trash = require('../models/trash');
const fs = require('fs')


const createTrash = async (req, res, next) => {
    const { name, type, description, price } = req.body;

    // membuat url
    // const urls = req.protocol + '://' + req.get('host') + '/';

    const urls = 'https://goloak.herokuapp.com/'

    try {
        const trash = new Trash(
            {
                name,
                type,
                description,
                price,
                image: urls + req.file.path,
                fileSize: fileSizeFormatter(req.file.size, 2)
            }
        );
        await trash.save();
        res.status(201).json({
            message: 'success',
            results: trash,
        })

    }catch(error) {
        res.status(400).send(error.message);
    }



}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

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

module.exports = {
    createTrash,
    getAllTrash
}