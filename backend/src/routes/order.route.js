import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/create", createOrder);
router.get("/:id", getOrderById);
router.put("/:id/status", updateStatus); 
router.patch("/:id/status", updateStatus); 

export default router;
