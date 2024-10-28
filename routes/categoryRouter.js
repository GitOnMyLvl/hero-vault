const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const validateHero = require('../validators/heroValidator')
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:categoryId', categoryController.getHeroesByCategory);
categoryRouter.post('/newCategory', categoryController.createNewCategory);
categoryRouter.post('/:categoryId/editCategory', categoryController.editCategory)
categoryRouter.get('/:categoryId/newHero', categoryController.getNewHero);
categoryRouter.post('/:categoryId/newHero', validateHero, categoryController.saveHero);
categoryRouter.get('/:categoryId/:heroId/editHero', categoryController.getEditHero);
categoryRouter.post('/:categoryId/:heroId/editHero', validateHero, categoryController.saveHero);
categoryRouter.get('/:categoryId/:heroId', categoryController.getHeroById);
categoryRouter.post('/:categoryId/delete', categoryController.deleteCategory);
categoryRouter.post('/:categoryId/:heroId/delete', categoryController.deleteHero);




module.exports = categoryRouter;