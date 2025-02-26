const Menu = require('../models/menu');

// Add a menu item
exports.addMenuItem = async (req, res) => {
  const { dish, category, day } = req.body;

  if (!dish || !category || !day) {
    return res.status(400).json({ msg: 'Dish, category, and day are required' });
  }

  try {
    const newMenuItem = new Menu({ dish, category, day });
    await newMenuItem.save();
    res.status(201).json({ msg: 'Menu item added successfully', newMenuItem });
  } catch (error) {
    res.status(500).json({ msg: 'Error adding menu item', error: error.message });
  }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching menu items', error: error.message });
  }
};

// Update a menu item
exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { dish, category, day } = req.body;

  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { dish, category, day },
      { new: true }
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }

    res.status(200).json({ msg: 'Menu item updated successfully', updatedMenuItem });
  } catch (error) {
    res.status(500).json({ msg: 'Error updating menu item', error: error.message });
  }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return res.status(404).json({ msg: 'Menu item not found' });
    }

    res.status(200).json({ msg: 'Menu item deleted successfully', deletedMenuItem });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting menu item', error: error.message });
  }
};