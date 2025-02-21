const ActualMenu = require("../models/ActualMenu");

const actualMenuController = async (req, res) => {
    try {
        const { dish, price, category, available } = req.body;
        const newMenuItem = new ActualMenu({ dish, price, category, available });
        await newMenuItem.save();
        res.status(201).json({ msg: "Menu item added successfully", newMenuItem });
    }catch (error) {
        res.status(500).json({ msg: "Error adding menu item", error });
    }
};

module.exports = actualMenuController;