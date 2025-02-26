const express = require('express');
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const {verifyToken} = require('../config/verifyToken');
const router = express.Router();

router.post('/add', verifyToken, addMenuItem);
router.get('/', getMenuItems);
router.put('/update/:id', verifyToken, updateMenuItem);
router.delete('/delete/:id', verifyToken, deleteMenuItem);

module.exports = router;