'use strict'
const Selling = require('../models/selling');
const User = require('../models/user');
const { cloudStorage } = require('../config/index');
const bucketGo = cloudStorage.bucket('storage_goloak');
const {format} = require('util');
const randomstring = require('randomstring');
const path = require('path');

const getSellingById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const user = await User.findById(userId).populate('penjualanku')
        // res.status(200).send(user.penjualanku.sort((a, b) => b.start_date - a.start_date))
        res.status(200).json({
            message: 'success',
            listSelling: user.penjualanku.sort((a, b) => b.createAt - a.createAt),
        })
    }catch(error) {
        res.status(400).send(error.message);
    }
}

// const postSellingById = async (req, res, next) => {
//     try{
//         const { userId } = req.params;
//         // Buat menyimpan penjualan baru
//         const newPenjualan = new Selling(req.body);
//         // Berdasarkan user Id
//         const user = await User.findById(userId);
//         // menetapkan db selling sebagai pengguna di db user
//         newPenjualan.pengguna = user;
//         // menyimpan penjualan
//         await newPenjualan.save();
//         // menambahkan db user di field sebagai new penjualan
//         user.penjualanku.push(newPenjualan);
//         // simpan user
//         await user.save();
//         res.status(201).json({
//             message: 'success',
//         })
        
//     }catch(error) {
//         res.status(400).send(error.message);
//     }

// }

const postSellingById = async (req, res, next) => {
    const { userId } = req.params;

    const { total_trash, total_point, nameTrash } = req.body;

    const file = req.file;
    const bucktUrl = 'https://storage.googleapis.com/storage_goloak/uploads/images/'

    try{
        if (!file) {
            res.status(400).json({
                message: 'file cannot be empty or upload files of type jpeg, jpg, and png'
            });
            return;
        }

        const fileName = 'goloak_sell_' + Math.floor(new Date().getTime() / 1000) + 
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
            console.log('storage_goloak url from selling : ' + publicUrl);
        });

        blobStream.end(req.file.buffer);

        // Buat menyimpan penjualan baru
        const newPenjualan = new Selling({
            total_trash,
            total_point,
            nameTrash,
            photoUrl: bucktUrl + fileName,
            fileSize: fileSizeFormatter(req.file.size, 2),
        });
        // Berdasarkan user Id
        const user = await User.findById(userId);
        // menetapkan db selling sebagai pengguna di db user
        newPenjualan.pengguna = user;
        // menyimpan penjualan
        await newPenjualan.save();
        // menambahkan db user di field sebagai new penjualan
        user.penjualanku.push(newPenjualan);
        // simpan user
        await user.save();
        res.status(201).json({
            message: 'success',
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

module.exports = {
    getSellingById,
    postSellingById,
}