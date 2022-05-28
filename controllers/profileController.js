const Profile = require('../models/profile')
const User = require('../models/user')

const getProfileById = async (req, res, next) => {
    try{
        const { userId } = req.params;
        const profile = await Profile.find()
        res.status(200).send(profile);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {getProfileById}