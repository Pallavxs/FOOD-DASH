import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    cuisine: String,

    location: {
      type: String,
      required: true,
      trim: true,
    },

    rating: {
      type: String,
      default: 0,
    },

    deliveryTime: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
