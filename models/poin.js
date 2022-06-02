const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PoinSchema = new Schema({
    point_min: {
        type: Number,
    },
    status: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now()
    },
    pengguna: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
},{versionKey: false})

const Poin = mongoose.model("poin", PoinSchema);
module.exports = Poin;