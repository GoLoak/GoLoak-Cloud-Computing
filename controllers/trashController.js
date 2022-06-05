'use strict'
const Trash = require('../models/trash');
const { cloudStorage } = require('../config/index');
const bucketGo = cloudStorage.bucket('storage_goloak');
const {format} = require('util');
const randomstring = require('randomstring');
const path = require('path');

const createTrash = async (req, res, next) => {
    const { name, type, description, price } = req.body;

    const file = req.file;

    // membuat url
    // const urls = req.protocol + '://' + req.get('host') + '/';

    const bucktUrl = 'https://storage.googleapis.com/storage_goloak/uploads/images/'
    
    try {
        if (!file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        const fileName = 'goloak_' + Math.floor(new Date().getTime() / 1000) + 
        '_' + randomstring.generate({length: 6, charset: 'alphabetic'}) 
        + path.extname(file.originalname);

        const blob = bucketGo.file(`uploads/images/${fileName}`);
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
            // res.status(200).send(publicUrl);
            console.log('storage_goloak url from trash : ' + publicUrl);
        });


        blobStream.end(req.file.buffer);

        const trash = new Trash(
            {
                name,
                type,
                description,
                price,
                image: bucktUrl + fileName,
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