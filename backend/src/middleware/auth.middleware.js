import redis from "../config/redis.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export async function authenticaUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    const isBlacklisted = await redis.get(token);

    if (isBlacklisted) {
        return res.status(401).json({ message: "Token is blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
      req.user._id = decoded.id;
        console.log('REQ USER:', req.user);
        return next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
