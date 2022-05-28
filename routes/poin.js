const express = require('express');
const { getPoinById, 
    postPoinById, 
    postPenggunaBaru, 
    getPengguna} = require('../controllers/poinController');
const router = express.Router();

router.get('/:userId/poin', getPoinById);
router.post('/addPengguna', postPenggunaBaru)
// router.get('/getPengguna', getPengguna)
router.post('/:userId/poin', postPoinById);

module.exports = router;