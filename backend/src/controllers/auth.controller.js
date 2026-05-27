import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const authTokenResponse = async (user, res, message) => {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "1 day" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    console.log("Received registration data:", { name, email, role });

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await userModel.create({ name, email, password, role });

    console.log("User created successfully:", user);

    await authTokenResponse(user, res, "User registered successfully");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }   

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    await authTokenResponse(user, res, "Login successful");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }   
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function logout(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
        res.clearCookie("token");
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

