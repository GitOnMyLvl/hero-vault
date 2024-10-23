const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:categoryId', categoryController.getHeroesByCategory);
categoryRouter.post('/newCategory', categoryController.createNewCategory);
categoryRouter.get('/:categoryId/newHero', categoryController.getNewHero);
categoryRouter.get('/:categoryId/:heroId', categoryController.getHeroById);



module.exports = categoryRouter;