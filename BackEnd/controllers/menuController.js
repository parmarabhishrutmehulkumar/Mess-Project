const Menu = require('../models/menu');

// Add a menu item
exports.addMenuItem = async (req, res) => {
  const { dish, price, category, available } = req.body;

  try {
    const newMenuItem = new Menu({ dish, price, category, available, });
    await newMenuItem.save();
    res.status(201).json({ msg: 'Menu item added successfully', newMenuItem });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding menu item', error });
  }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching menu items', error })
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;  // Get menu item ID from route params
  const { dish, price, category, available } = req.body;

  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { dish, price, category, available },
      { new: true }  // Return the updated document
    );
    
    if (!updatedMenuItem) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }

    res.status(200).json({ msg: 'Menu item updated successfully', updatedMenuItem });
  } catch (error) {
    res.status(500).json({ msg: 'Error updating menu item', error });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;  // Get menu item ID from route params

  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(id);
    
    if (!deletedMenuItem) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }

    res.status(200).json({ msg: 'Menu item deleted successfully', deletedMenuItem });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting menu item', error });
  }
};