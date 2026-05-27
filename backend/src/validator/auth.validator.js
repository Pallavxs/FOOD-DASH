import { body, validationResult } from 'express-validator';

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {    
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}   

export const validateRegister = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').default('customer').optional().isIn(['customer', 'admin', 'vendor']).withMessage('Role must be either customer, admin, or vendor'),
    validateError,
];

export const validateLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    validateError,
];
