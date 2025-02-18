const express = require('express');
const { addMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const verifyToken = require('../config/verifyToken');
const router = express.Router();

// Add a menu item (only authorized users)
router.post('/add', verifyToken, addMenuItem);

// Get all menu items
router.get('/', getMenuItems);

// Update a menu item (only authorized users)
router.put('/update/:id', verifyToken, updateMenuItem);

// Delete a menu item (only authorized users)
router.delete('/delete/:id', verifyToken, deleteMenuItem);

module.exports = router;