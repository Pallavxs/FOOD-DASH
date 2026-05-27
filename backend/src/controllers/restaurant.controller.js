import Restaurant from "../models/restarunt.model.js";
import mongoose from "mongoose";

export async function getRestaurants(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const restaurants = await Restaurant.find().skip(skip).limit(Number(limit));
    console.log("Fetched restaurants:", restaurants);

    res.status(200).json({ data: restaurants });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getRestaurantById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid restaurant id" });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ data: restaurant });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function searchRestaurants(req, res) {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    if (!q) {
      return res
        .status(400)
        .json({ message: "Query parameter `q` is required" });
    }

    const regex = new RegExp(q, "i");
    const skip = (Number(page) - 1) * Number(limit);

    const restaurants = await Restaurant.find({
      $or: [{ name: regex }, { cuisine: regex }],
    })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({ data: restaurants });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function createRestaurant(req, res) {
  try {
    const { name, cuisine, location, image, deliveryTime } = req.body;

    const newRestaurant = new Restaurant({
      name,
      cuisine,
      location,
      image,
      deliveryTime,
    });

    const savedRestaurant = await newRestaurant.save();
    
    res.status(201).json({ data: savedRestaurant });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
