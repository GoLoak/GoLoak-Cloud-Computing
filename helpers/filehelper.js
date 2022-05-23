'use strict';
const multer = require('multer');
const path = require('path')
const randomstring = require('randomstring')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, 'goloak_' + Math.floor(new Date().getTime() / 1000) + '_' + randomstring.generate({length: 6, charset: 'alphabetic'}) + path.extname(file.originalname));
        // cb(null, file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' 
        || file.mimetype === 'image/jpeg'){
            cb(null, true);
        }else {
            cb(null, false);
        }
}

const upload = multer({storage: storage, fileFilter: filefilter});

module.exports = {upload}