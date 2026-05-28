import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  searchRestaurants,
  createRestaurant,
  editRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller.js";
import { validateRestaurant } from "../validator/restaurant.validator.js";
import { authenticaUser } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/search", searchRestaurants);
router.get("/", getRestaurants);
router.post("/create", authenticaUser, upload.single("image"), validateRestaurant, createRestaurant);
router.get("/:id", getRestaurantById);
router.put("/:id", authenticaUser, upload.single("image"), editRestaurant);
router.delete("/:id", authenticaUser, deleteRestaurant);

export default router;
