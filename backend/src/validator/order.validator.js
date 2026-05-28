import { body, validationResult } from "express-validator";

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateOrder = [
    body("restaurant").notEmpty().withMessage("Restaurant ID is required"),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Items must be an array with at least one item"),

    body("items.*.menuItem")
        .notEmpty()
        .withMessage("Menu item ID is required for each item"),

    body("items.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1 for each item"),

    validateError,
];
