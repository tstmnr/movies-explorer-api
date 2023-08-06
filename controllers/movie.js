const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const Movie = require('../models/movie');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');
const {
  MOVIE_BAD_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  MOVIE_BAD_ID_MESSAGE,
  MOVIE_DELETE_NF_MESSAGE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MOVIE_NOT_FOUND_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(MOVIE_BAD_DATA_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(() => {
      throw new NotFoundError(MOVIE_DELETE_NF_MESSAGE);
    })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(MOVIE_FORBIDDEN_MESSAGE);
      }
      movie.deleteOne();
    })
    .then((movie) => {
      res.status(200).send(movie);
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequest(MOVIE_BAD_ID_MESSAGE));
      } else {
        next(err);
      }
    });
};
