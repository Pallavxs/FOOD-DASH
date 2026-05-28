import { body, validationResult } from "express-validator";

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateRestaurant = [
    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("cuisine")
        .notEmpty()
        .withMessage("Cuisine is required"),

    body("deliveryTime")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Delivery time must be a positive integer"),

    body("rating")
        .optional()
        .isFloat({ min: 0, max: 5 })
        .withMessage("Rating must be a number between 0 and 5"),

    validateError,
];