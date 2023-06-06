const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

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
      res.status(200).send(data);
    })
    .catch(next);
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
  res.status(200).send({ message: 'Выход из аккаунта' });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

module.exports.patchUserData = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};
