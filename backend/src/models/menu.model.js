import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", MenuSchema, "menus");

export default Menu;
