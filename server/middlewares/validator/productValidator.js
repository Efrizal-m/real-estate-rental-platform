// productValidator.js
const { body } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('Product name is required'),
  body('description').notEmpty().withMessage('Product description is required'),

  body('highlights')
    .isArray({ min: 1 })
    .withMessage('At least one highlight is required'),
  body('highlights.*')
    .notEmpty()
    .withMessage('Highlight item cannot be empty'),

  body('specifications')
    .isArray({ min: 1 })
    .withMessage('At least one specification is required'),
  body('specifications.*.title')
    .notEmpty()
    .withMessage('Specification title is required'),
  body('specifications.*.description')
    .notEmpty()
    .withMessage('Specification description is required'),

  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Product price must be greater than 0'),

  body('cuttedPrice')
    .isFloat({ gt: 0 })
    .withMessage('Cutted price must be greater than 0'),

  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('images.*.public_id')
    .notEmpty()
    .withMessage('Image public_id is required'),
  body('images.*.url')
    .notEmpty()
    .withMessage('Image URL is required'),

  body('brandname').notEmpty().withMessage('Brand name is required'),
  body('logo')
    .notEmpty()
    .withMessage('Brand logo image is required'),

  body('category')
    .notEmpty()
    .withMessage('Product category is required'),

  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
];

module.exports = { validateProduct }