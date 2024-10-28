const { body } = require('express-validator');

const validateHero = [
  body('name').notEmpty().withMessage('Name is required'),
  body('alignment').isIn(['good', 'neutral', 'evil']).withMessage('Invalid alignment'),
  body('powers').optional().isString(),
  body('weaknesses').optional().isString(),
  body('character_traits').optional().isString(),
  body('first_appearance').optional().isString(),
];

module.exports = validateHero;