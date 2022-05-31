'use strict'
// module
const express = require('express');
const {upload} = require('../helpers/filehelper');


// middelwares


// controller
const { getHistoryPoinById, 
    postHistoryPoinById} = require('../controllers/poinController');
const {getSellingById,
    postSellingById} = require('../controllers/sellingController');
const {createTrash, getAllTrash} = require('../controllers/trashController');

// router
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Berada di path /api');
})

// poin
router.get('/point/:userId', getHistoryPoinById);
router.post('/point/:userId', postHistoryPoinById);

// penjualan
router.get('/selling/:userId', getSellingById);
router.post('/selling/:userId', postSellingById); 

// trash
router.get('/trash/', getAllTrash)
router.post('/trash/', upload.single('file'), createTrash); 


module.exports = router;
