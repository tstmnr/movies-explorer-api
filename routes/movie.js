/* eslint-disable import/no-extraneous-dependencies */
const movieRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movie');

// получает список всех фильмов пользователя
movieRouter.get('/', getMovies);

// создает фильм
movieRouter.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

// удаляет фильм из избранных
movieRouter.delete('/:_id', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = movieRouter;
