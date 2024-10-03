const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/categories', categoryController.getCategories);
categoryRouter.get('/categories/:categoryId', categoryController.getHeroesByCategory);
categoryRouter.get('/categories/:categoryId/:heroId', categoryController.getHeroById);

module.exports = categoryRouter;