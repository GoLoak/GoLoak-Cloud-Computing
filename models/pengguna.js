const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PengunaSchema = new Schema({
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    date_add: {
        type: Date,
        default: Date.now()
    },
    poinku: [{
            type: Schema.Types.ObjectId,
            ref: 'poin'
        }]
})

const Pengguna = mongoose.model("pengguna", PengunaSchema);
module.exports = Pengguna;