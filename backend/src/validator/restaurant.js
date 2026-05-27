import { body, validationResult } from "express-validator";

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateRestaurant = [
    body("name").notEmpty().withMessage("Name is required"),
    body("cuisine").notEmpty().withMessage("Cuisine is required"),
    body("image").optional().isURL().withMessage("Image must be a valid URL"),
    body("deliveryTime").optional().isInt({ min: 1 }).withMessage("Delivery time must be a positive integer"),
    validateError,
];