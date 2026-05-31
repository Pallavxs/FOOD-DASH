import Restaurant from "../models/restarunt.model.js";
import mongoose from "mongoose";

export async function getRestaurants(req, res) {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const restaurants = await Restaurant.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

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
    
    console.log("Fetching restaurant with id:", id);
    
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
    // Accept query as `query` or `keyword` (fallback to `q` for legacy)
    const { query, keyword, q, page = 1, limit = 20 } = req.query;
    const searchTerm = query || keyword || q;
    console.log('Search Query:', req.query);
    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }
    const regex = new RegExp(searchTerm, "i");
    const skip = (Number(page) - 1) * Number(limit);

    // Search only name and cuisine as per spec
    const restaurants = await Restaurant.find({
      $or: [{ name: regex }, { cuisine: regex }],
    })
      .skip(skip)
      .limit(Number(limit));
    res.status(200).json({ data: restaurants });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function createRestaurant(req, res) {
  try {
    const { name, cuisine, location, deliveryTime, rating } = req.body;

    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Restaurant image is required" });
    }

    const existingRestaurant = await Restaurant.findOne({ name });
    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant already exists" });
    }

    const newRestaurant = new Restaurant({
      owner: req.user.id,
      name,
      cuisine,
      location,
      image: imageUrl,
      deliveryTime,
      rating,
    });

    const savedRestaurant = await newRestaurant.save();

    return res.status(201).json({ data: savedRestaurant });
  } catch (error) {

    if (error.code === 11000) {
      return res.status(400).json({ message: "Restaurant with this name already exists" });
    }
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function editRestaurant(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      cuisine,
      location,
      deliveryTime,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid restaurant id",
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updateData = {};

    if (name) updateData.name = name;

    if (cuisine) updateData.cuisine = cuisine;

    if (location) updateData.location = location;

    if (deliveryTime) {
      updateData.deliveryTime = deliveryTime;
    }

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedRestaurant =
      await Restaurant.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      data: updatedRestaurant,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function deleteRestaurant(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid restaurant id",
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    if (
      restaurant.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Restaurant.findByIdAndDelete(id);

    res.status(200).json({
      message: "Restaurant deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
