const Movie = require('../models/movie');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequest = require('../errors/BadRequest');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;

  Movie.create({ owner, ...req.body })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest('Переданы некорректные данные');
      }

      res.status(201).send(movie);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Не удалось найти фильм');
      }
      if (movie.owner.toString() !== owner) {
        throw new ConflictError('Невозможно удалить не свой фильм');
      } else {
        Movie.findByIdAndDelete(_id)
          .then((deletedMovie) => {
            res.status(200).send({ data: deletedMovie });
          })
          .catch(next);
      }
    })
    .catch(next);
};
