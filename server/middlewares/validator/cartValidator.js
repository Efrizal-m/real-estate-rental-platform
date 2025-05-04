// validators/cartValidator.js
const { body, param } = require('express-validator');

exports.validateAddToCart = [
  body('product').notEmpty().withMessage('Product ID is required'),
  body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('productAttributes').optional().isString(),
];

exports.validateEditCart = [
  body('cartItemId').notEmpty().withMessage('Cart Item ID is required'),
  body('quantity').notEmpty().withMessage('Quantity is required')
    .isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

exports.validateDeleteCart = [
  param('cartItemId').notEmpty().withMessage('Cart Item ID is required'),
];