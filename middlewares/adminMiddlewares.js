const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authorizeAdmin = async (req, res, next) => {
    const { token } = req.headers;

    try {
        if(!token) {
            return res.status(403).json({
                message: "invalid",
                result: "Please login to continue"
            });
        }
        const verify = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: verify.id });

        if(user.status !== 'admin') {
            return res.status(403).json({
                message: "invalid",
                result: "Sorry you are not admininstrator"
            });
        }

        if(!user) {
            return res.status(403).json({
                message: "invalid",
                result: "Cek your credentials"
            });
        }

        return next();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { authorizeAdmin }