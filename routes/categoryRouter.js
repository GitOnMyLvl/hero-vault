const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:categoryId', categoryController.getHeroesByCategory);
categoryRouter.get('/:categoryId/:heroId', categoryController.getHeroById);
categoryRouter.post('/newCategory', categoryController.createNewCategory)

module.exports = categoryRouter;