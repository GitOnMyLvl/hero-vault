const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const validateHero = require('../validators/heroValidator')
const authMiddleware = require('../middleware/authMiddleware'); 
const categoryRouter = Router();

categoryRouter.get('/', categoryController.getCategories);
categoryRouter.get('/:categoryId', categoryController.getHeroesByCategory);
categoryRouter.post('/newCategory', authMiddleware, categoryController.createNewCategory);
categoryRouter.post('/:categoryId/editCategory', authMiddleware, categoryController.editCategory)
categoryRouter.get('/:categoryId/newHero', authMiddleware, categoryController.getNewHero);
categoryRouter.post('/:categoryId/newHero', validateHero, categoryController.saveHero);
categoryRouter.get('/:categoryId/:heroId/editHero', authMiddleware, categoryController.getEditHero);
categoryRouter.post('/:categoryId/:heroId/editHero', validateHero, categoryController.saveHero);
categoryRouter.get('/:categoryId/:heroId', categoryController.getHeroById);
categoryRouter.post('/:categoryId/delete', authMiddleware, categoryController.deleteCategory);
categoryRouter.post('/:categoryId/:heroId/delete', authMiddleware, categoryController.deleteHero);




module.exports = categoryRouter;