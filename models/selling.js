const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellingSchema = new Schema({
    total_trash: {
        type: Number,
        required: true
    },
    total_point: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Menunggu penjemputan",
    },
    nameTrash: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    fileSize: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    pengguna: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
},{versionKey: false})

const Selling = mongoose.model("selling", SellingSchema);
module.exports = Selling;