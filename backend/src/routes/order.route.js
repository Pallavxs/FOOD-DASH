import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  updateRiderLocation,
} from "../controllers/order.controller.js";
import { authenticaUser } from "../middleware/auth.middleware.js";
import { validateOrder } from "../validator/order.validator.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/create", authenticaUser,  authorizeRoles("customer"), validateOrder, createOrder);

router.get("/", authenticaUser, getOrders);

router.get("/:id", authenticaUser, getOrderById);

router.patch("/:id/status", authenticaUser,  authorizeRoles("vendor", "admin"), updateOrderStatus );

router.patch("/:id/location", authenticaUser, authorizeRoles("rider", "admin"), updateRiderLocation);

export default router;
