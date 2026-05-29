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
import { authorizeRoles } from "../middleware/role.middleware.js";


route.get("/", getMenu);
route.get("/item/:id", getMenuItem);
route.get("/restaurant/:restaurantId", getMenuByRestaurantId);

route.post("/create", authenticaUser, authorizeRoles("vendor", "admin"), upload.single("image"), validateMenu, createMenu );

route.put("/:id", authenticaUser, authorizeRoles("vendor", "admin") , upload.single("image"), validateMenu, updateMenu );

route.delete("/:id", authenticaUser, authorizeRoles("vendor", "admin") ,deleteMenu );

export default route;
