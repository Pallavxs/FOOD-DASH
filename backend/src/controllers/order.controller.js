import Order from "../models/order.model.js";
import Menu from "../models/menu.model.js";

export const createOrder = async (req, res) => {
  try {
    const { restaurant, items, riderLocation } = req.body;

    const user = req.user.id;

    if (!restaurant || !items?.length) {
      return res.status(400).json({
        message: "Restaurant and items are required",
      });
    }

    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItem);

      if (!menuItem) {
        return res.status(404).json({
          message: "Menu item not found",
        });
      }

      totalAmount += menuItem.price * item.quantity;
    }

    const order = await Order.create({
      user,
      restaurant,
      items,
      totalAmount,
      riderLocation,
    });

    res.status(201).json(order);

  } catch (error) {
  console.error("Error creating order:", error);

  res.status(500).json({
    message: "Internal server error",
    error: error.message,
  });
}
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price")
      .lean();

    res.status(200).json(orders);

  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price")
      .lean();

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);

  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body || {};

    const allowedStatuses = [
      "placed",
      "preparing",
      "out_for_delivery",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after"}
    )
      .populate("user", "name email")
      .populate("restaurant", "name");

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(updatedOrder);

  } catch (error) {
    console.error("UPDATE ORDER STATUS ERROR:", error);

    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};

export const updateRiderLocation = async (req, res) => {
  try {
    const { riderLocation } = req.body;

    if (
      !riderLocation ||
      typeof riderLocation.lat !== "number" ||
      typeof riderLocation.lng !== "number"
    ) {
      return res.status(400).json({
        message: "Valid rider location is required",
      });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { riderLocation },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(updatedOrder);

  } catch (error) {
    console.error("UPDATE RIDER LOCATION ERROR:", error);

    res.status(500).json({
      message: "Failed to update rider location",
    });
  }
};