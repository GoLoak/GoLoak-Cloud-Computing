const { text } = require('body-parser');
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const UserSchema = new Schema({
    nama : {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nomer: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
},
{ versionKey: false });

const User = mongoose.model("user", UserSchema);
module.exports = User;