import express from "express";
import morgan from "morgan";
import config from "./config/config.js";
import authRoute from "./routes/auth.route.js";
import restaurantRoute from "./routes/restaurant.route.js";
import menuRoute from "./routes/menu.route.js";
import orderRoute from "./routes/order.route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoute);
app.use("/api/restaurants", restaurantRoute);
app.use("/api/menus", menuRoute);
app.use("/api/orders", orderRoute);


export default app;
