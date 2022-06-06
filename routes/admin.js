'use strict'
// module
const express = require('express');

// middelwares
const { authorizeAdmin } = require('../middlewares/adminMiddlewares');

// controller
const {getAllTrash,
    trashFindById,
    trashUpdateById,
    trashDeleteById} = require('../controllers/admin/trashController');
const { getAllSelling,
    sellingFindById,
    sellingUpdateById,
    sellingDeleteById,} = require('../controllers/admin/sellingController');
const {
    getAllUser,
    userFindById,
    userUpdateById,
    userDeleteById,
} = require('../controllers/admin/userController');
// router
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Berada di path /admin');
})

// trash
router.get('/trash/', authorizeAdmin, getAllTrash);
router.get('/trash/:trashId', authorizeAdmin, trashFindById);
router.put('/trash/:trashId', authorizeAdmin, trashUpdateById);
router.patch('/trash/:trashId', authorizeAdmin, trashUpdateById);
router.delete('/trash/:trashId', authorizeAdmin, trashDeleteById);

// selling
router.get('/selling/', authorizeAdmin, getAllSelling);
router.get('/selling/:sellingId', authorizeAdmin, sellingFindById);
router.put('/selling/:sellingId', authorizeAdmin, sellingUpdateById);
router.patch('/selling/:sellingId', authorizeAdmin, sellingUpdateById);
router.delete('/selling/:sellingId', authorizeAdmin, sellingDeleteById);

// user
router.get('/user/', authorizeAdmin, getAllUser);
router.get('/user/:userId', authorizeAdmin, userFindById);
router.put('/user/:userId', authorizeAdmin, userUpdateById);
router.patch('/user/:userId', authorizeAdmin, userUpdateById);
router.delete('/user/:userId', authorizeAdmin, userDeleteById);

module.exports = router;
