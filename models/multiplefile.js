const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mulitipleFileSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    files: [Object]
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('MultipleFile', mulitipleFileSchema);