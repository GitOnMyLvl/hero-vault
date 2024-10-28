const { Router } = require('express');
const loginController = require('../controllers/loginController');
const authRouter = Router();

authRouter.get('/login', loginController.getLoginPage);
authRouter.post('/login', loginController.postLogin);

module.exports = authRouter;