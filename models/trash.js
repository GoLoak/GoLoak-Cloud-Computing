const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const Schema = mongoose.Schema;

const TrashSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    fileSize: {
        type: String,
    }
},{versionKey: false})

const Trash = mongoose.model("trash", TrashSchema);
module.exports = Trash;