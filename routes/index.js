/* eslint-disable import/no-extraneous-dependencies */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { createUser, login, logout } = require('../controllers/user');
const userRouter = require('./user');
const movieRouter = require('./movie');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

// создает пользователя по email, password и name
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

// проверяет переданные в теле email, password и отправляет токен в куков пользователя
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// удаляет токен из куков пользователя
router.post('/signout', logout);
router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);
router.all('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница не существует'));
});

module.exports = router;
