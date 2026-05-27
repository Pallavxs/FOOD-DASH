import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    restaurant: String,

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: String,
  },
  { timestamps: true},
);

const Menu = mongoose.model("Menu", MenuSchema, "menus");

export default Menu;
