const express = require('express');
const {getPenjualanById,
    postPoinById} = require('../controllers/penjualanController');
const router = express.Router();

router.get('/:userId', getPenjualanById);
router.post('/:userId', postPoinById);

module.exports = router;