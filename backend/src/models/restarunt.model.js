import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    image: String,

    cuisine: String,

    rating: {
      type: Number,
      default: 4,
    },

    deliveryTime: String,
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
