'use strict';
const SingleFile = require('../models/singlefile');
const MultipleFile = require('../models/multiplefile');
const { cloudStorage } = require('../config/index');
const bucketGo = cloudStorage.bucket('storage_goloak');
const {format} = require('util');
const randomstring = require('randomstring');
const path = require('path');

const singleFileUpload = async (req, res, next) => {

    const file = req.file;
    const bucktUrl = 'https://storage.googleapis.com/storage_goloak/uploads/images/'
    
    try{
        if (!file) {
            res.status(400).json({
                message: 'file cannot be empty or upload files of type jpeg, jpg, and png'
            });
            return;
        }

        const fileName = 'goloak_uploader_' + Math.floor(new Date().getTime() / 1000) + 
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

        const newFile = new SingleFile({
            fileName: file.originalname,
            fileUrl: bucktUrl + fileName,
            fileType: file.mimetype,
            fileSize: fileSizeFormatter(file.size, 2) // 0.00
        });
        await newFile.save();
        res.status(201).json({
            message: "File Uploaded Successfully",
            resul: newFile
        });
    }catch(error) {
        res.status(400).json({
            message: error.message
        });
    }
}
const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                fileUrl: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            title: req.body.title,
            files: filesArray 
        });
        await multipleFiles.save();
        res.status(201).json({
            message: 'Multiple Files Uploaded Successfully'
        });
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const getallMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFile.find();
        res.status(200).send(files);
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

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallMultipleFiles
}