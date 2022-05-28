const express = require('express');
const { getProfileById } = require('../controllers/profileController');
const router = express.Router();

router.get('/:userId', getProfileById);

module.exports = router;