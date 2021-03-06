const { text } = require('body-parser');
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const UserSchema = new Schema({
    fullname : {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    point: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'user'
    },
    historypoint: [
        {
            type: Schema.Types.ObjectId,
            ref: 'poin'
        }
    ],
    penjualanku: [
        {
            type: Schema.Types.ObjectId,
            ref: 'selling'
        }
    ]
},
{ versionKey: false });

const User = mongoose.model("user", UserSchema);
module.exports = User;