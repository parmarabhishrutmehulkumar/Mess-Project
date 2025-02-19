const express = require('express');
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const {verifyToken, roleCheck} = require('../config/verifyToken');
const router = express.Router();

router.post('/add', verifyToken,roleCheck(["mess-staff"]), addMenuItem);
router.get('/', getMenuItems);
router.put('/update/:id', verifyToken,roleCheck(["mess-staff"]), updateMenuItem);
router.delete('/delete/:id', verifyToken,roleCheck(["mess-staff"]), deleteMenuItem);

module.exports = router;