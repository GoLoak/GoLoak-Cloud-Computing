'use strict'
// module
const express = require('express');

// controller
const {loginUser,
    signupUser,
    forgotPassword,
    resetPassword,
    authorizeUser} = require('../middlewares/userMiddlewares');

// router
const router = express.Router();

router.post('/login/', loginUser);
router.post('/signup/', signupUser);
router.post('/forgot/', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.get('/test-auth/', authorizeUser, (req, res) => {
    res.send('for test authorize user');
});


module.exports = router;