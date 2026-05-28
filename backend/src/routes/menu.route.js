import express from "express";

const route = express.Router();
import {
  getMenu,
  getMenuByRestaurantId,
  createMenu,
  getMenuItem,
  updateMenu,
  deleteMenu,
} from "../controllers/menu.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { authenticaUser } from "../middleware/auth.middleware.js";
import { validateMenu } from "../validator/menu.validator.js";


route.get("/", getMenu);
route.get("/item/:id", getMenuItem);
route.get("/:restaurantId", getMenuByRestaurantId);

route.post("/create", authenticaUser, upload.single("image"), validateMenu, createMenu );

route.put("/:id", authenticaUser, upload.single("image"), validateMenu, updateMenu );

route.delete("/:id", authenticaUser, deleteMenu );

export default route;
