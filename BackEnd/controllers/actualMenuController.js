const ActualMenu = require("../models/ActualMenu");

const placeOrder = async (req, res) => {
    try {
        const { dish, price, category, available } = req.body;
        const newMenuItem = new ActualMenu({ dish, price, category, available });
        await newMenuItem.save();
        res.status(201).json({ msg: "Menu item added successfully", newMenuItem });
    }catch (error) {
        res.status(500).json({ msg: "Error adding menu item", error });
    }
};
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await ActualMenu.find();
        res.status(200).json(menuItems);
    }catch (error) {
        res.status(500).json({ msg: "Error fetching menu items", error });
    }
};

module.exports = {placeOrder, getMenuItems};