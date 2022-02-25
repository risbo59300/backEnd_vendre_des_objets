const express = require('express');

const userCtrl = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/signup', userCtrl.signup);
userRouter.post('/login', userCtrl.login);


module.exports = userRouter;