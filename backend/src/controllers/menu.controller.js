import mongoose from "mongoose";
import Restaurant from "../models/restarunt.model.js";
import Menu from "../models/menu.model.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();

    res.status(200).json(menu);
  } catch (error) {
    console.log("GET MENU ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch menu",
    });
  }
};

export const getMenuByRestaurantId = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menu = await Menu.find({
      restaurant: restaurantId,
    });

    res.status(200).json(menu);
  } catch (error) {
    console.log("GET RESTAURANT MENU ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch restaurant menu",
    });
  }
};

export const createMenu = async (req, res) => {
  try {
    const { restaurant, name, description, price } = req.body;

    let imageUrl = req.file ? req.file.path : (req.body.image || "");

    if (!imageUrl) {
      return res.status(400).json({ message: "Restaurant image is required" });
    }

    if (!restaurant || !name || !description || !price) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const restaurantExists = await Restaurant.findById(restaurant);

    if (!restaurantExists) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }


    const newMenu = new Menu({
      restaurant,
      name,
      description,
      price,
      image: imageUrl,
    });

    const savedMenu = await newMenu.save();

    res.status(201).json(savedMenu);

  } catch (error) {
    console.error("CREATE MENU ERROR:", error);

    res.status(500).json({
      message: "Failed to create menu",
      error: error.message,
    });
  }
};

export const getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid menu id" });
    }
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(menuItem);
  } catch (error) {
    console.error("GET MENU ITEM ERROR:", error);
    res.status(500).json({ message: "Failed to fetch menu item" });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid menu id",
      });
    }

    const updatedData = {
      ...req.body,
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMenu) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.status(200).json(updatedMenu);

  } catch (error) {
    console.error("UPDATE MENU ERROR:", error);

    res.status(500).json({
      message: "Failed to update menu",
    });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid menu id" });
    }
    const deletedMenu = await Menu.findByIdAndDelete(id);
    if (!deletedMenu) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json({ message: "Menu item deleted" });
  } catch (error) {
    console.error("DELETE MENU ERROR:", error);
    res.status(500).json({ message: "Failed to delete menu" });
  }
};
