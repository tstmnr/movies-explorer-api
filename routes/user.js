/* eslint-disable import/no-extraneous-dependencies */
const userRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUserInfo, patchUserData } = require('../controllers/user');

// возвращает информацию о пользователе (email и имя)
userRouter.get('/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), patchUserData);

module.exports = userRouter;
