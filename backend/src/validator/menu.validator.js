import { body, validationResult } from "express-validator";

export const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateMenu = [
    body("restaurant")
        .notEmpty()
        .withMessage("Restaurant ID is required"),
    body("name")
        .notEmpty()
        .withMessage("Menu item name is required"),
    body("description")
        .notEmpty()
        .withMessage("Menu item description is required"),
    body("price")
        .notEmpty()
        .withMessage("Menu item price is required")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a positive number"),
    validateError,
]