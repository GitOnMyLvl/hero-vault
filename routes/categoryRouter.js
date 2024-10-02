const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/categories', categoryController.getCategories);
categoryRouter.get('/categories/:categoryName', categoryController.getCategoryByName);
categoryRouter.get('/categories/:categoryName/:heroName', categoryController.getHeroByName)

module.exports = categoryRouter;