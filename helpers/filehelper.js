'use strict';
const Multer = require('multer');
const path = require('path');
const randomstring = require('randomstring')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'goloak_' + Math.floor(new Date().getTime() / 1000) + 
//         '_' + randomstring.generate({length: 6, charset: 'alphabetic'}) 
//         + path.extname(file.originalname));
//     }
// });

const storage = Multer.memoryStorage();

const fileSize = 20 * 1024 * 1024; // jangan melebihi 20 MB.

const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = Multer({storage: storage, fileFilter: filefilter, limits: fileSize});

module.exports = {upload};