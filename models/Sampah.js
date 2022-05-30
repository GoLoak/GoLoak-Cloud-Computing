const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SampahSchema = new Schema({
    nama_sampah: {
        type: String,
        required: true
    },
    jenis_sampah: {
        type: String,
        required: true
    },
    deskripsi_sampah: {
        type: String,
    },
    image_sampah: {
        type: String,
    },
    harga_jual: {
        type: Number
    },
    pengguna: {
            type: Schema.Types.ObjectId,
            ref: 'selling'
        }
})

const Sampah = mongoose.model("sampah", SampahSchema);
module.exports = Sampah;