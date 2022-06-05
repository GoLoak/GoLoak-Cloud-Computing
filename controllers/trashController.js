'use strict'
const Trash = require('../models/trash');
const { cloudStorage } = require('../config/index');
const bucketGo = cloudStorage.bucket('storage_goloak');
const {format} = require('util');

const createTrash = async (req, res, next) => {
    const { name, type, description, price } = req.body;

    const file = req.file;

    // membuat url
    // const urls = req.protocol + '://' + req.get('host') + '/';

    const urls = 'https://goloak.herokuapp.com/'

    
    
    
    try {
        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }
        const blob = bucketGo.file(`uploads/images/${file.originalname}`);
        const blobStream = blob.createWriteStream({
            resumable: false,
        })

        blobStream.on('error', err => {
            next(err);
        });

        blobStream.on('finish', () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = format(
            `https://storage.googleapis.com/storage_goloak/${blob.name}`
            );
            res.status(200).send(publicUrl);
        });


        blobStream.end(req.file.buffer);

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
        // res.status(201).json({
        //     message: 'success',
        //     results: trash,
        // })

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