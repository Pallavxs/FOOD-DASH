import mongoose from "mongoose";

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

    console.log("Restaurant ID:", restaurantId);

    const menu = await Menu.find({
      restaurant: restaurantId,
    });

    console.log("Fetched Menu:", menu);

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
    const newMenu = new Menu(req.body);
    const savedMenu = await newMenu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    console.error("CREATE MENU ERROR:", error);
    res.status(500).json({
      message: "Failed to create menu",
      error: error.message
    });
  }
};