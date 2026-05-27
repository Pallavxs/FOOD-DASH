import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  searchRestaurants,
  createRestaurant,
} from "../controllers/restaurant.controller.js";
import { validateRestaurant } from "../validator/restaurant.js";
import { authenticaUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getRestaurants);
router.post("/create", validateRestaurant ,authenticaUser, createRestaurant);
router.get("/:id", getRestaurantById);
router.get("/search", searchRestaurants);

export default router;