import Order from "../models/order.model.js";

export const createOrder = async (req, res) => {
  try {
    const {
      user,
      restaurant,
      items,
      totalAmount,
      riderLocation,
    } = req.body;
    

    const newOrder = new Order({
      user: user || (req.user && req.user._id),
      restaurant,
      items,
      totalAmount,
      riderLocation,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name")
      .populate("items.menuItem", "name price");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateRiderLocation = async (req, res) => {
  try {
    const { riderLocation } = req.body;
    if (!riderLocation) {
      return res.status(400).json({ message: "Rider location is required" });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { riderLocation },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating rider location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
