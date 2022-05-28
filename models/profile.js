const { text } = require('body-parser');
const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const ProfileSchema = new Schema({
    profile: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    foto: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SingleFile'
        }
    ],
    update: {
        type: Date,
        default: Date.now(),
    },
},
{ versionKey: false });

const Profile = mongoose.model("profile", ProfileSchema);
module.exports = Profile;