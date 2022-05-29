const express = require('express');
const { getPoinById, 
    postPoinById,
    getOnePoinById} = require('../controllers/poinController');
const router = express.Router();

router.get('/:userId', getPoinById);
// router.post('/addPengguna', postPenggunaBaru)
// router.get('/getPengguna', getPengguna)
router.post('/:userId', postPoinById);
router.get('/onepoint/:userId', getOnePoinById);

module.exports = router;