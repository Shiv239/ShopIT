/* AUTHOR: Tanvi Pruthi*/

const express = require('express');
const { addUser, verifyUser, changePassword } = require('../controllers/user_controller');
const userRouter = express.Router();

userRouter.post('/addUser',addUser)

userRouter.post('/verifyUser',verifyUser)

userRouter.post('/changePassword',changePassword)

module.exports = userRouter;