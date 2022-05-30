const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellingSchema = new Schema({
    jumlah_sampah: {
        type: Number,
        required: true
    },
    jumlah_point: {
        type: Number,
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
    },
    pengguna: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
})

const Selling = mongoose.model("selling", SellingSchema);
module.exports = Selling;