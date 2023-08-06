const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { ValidationError } = require('mongoose').Error;
const BadRequest = require('../errors/BadRequest');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  SIGNOUT_MESSAGE,
  SIGNUP_BAD_DATA_MESSAGE,
  SIGNUP_CONFLICT_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_BAD_DATA_MESSAGE,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(201).send(data);
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(SIGNUP_BAD_DATA_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(SIGNUP_CONFLICT_MESSAGE));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });
      const data = user.toObject();
      delete data.password;
      res.status(200).send(data);
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.cookie('jwt', 'none', {
    maxAge: 5000,
    httpOnly: true,
    sameSite: true,
  });
  res.status(200).send(SIGNOUT_MESSAGE);
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

module.exports.patchUserData = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
    })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(USER_BAD_DATA_MESSAGE));
      } else if (err.code === 11000) {
        next(new ConflictError(SIGNUP_CONFLICT_MESSAGE));
      } else {
        next(err);
      }
    });
};
