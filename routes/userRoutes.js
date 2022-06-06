'use strict'
// module
const express = require('express');

// controller
const {loginUser,
    signupUser,
    forgotPassword,
    resetPassword} = require('../middlewares/userMiddlewares');

// router
const router = express.Router();

router.post('/login/', loginUser);
router.post('/signup/', signupUser);
router.post('/forgot/', forgotPassword);
router.post('/reset-password/:token', resetPassword);


module.exports = router;