const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  AUTH_MESSAGE,
  TOKEN_MESSAGE,
} = require('../utils/constants');

module.exports = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie) {
    next(new UnauthorizedError(AUTH_MESSAGE));
  }
  const token = cookie.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new UnauthorizedError(TOKEN_MESSAGE);
  }

  req.user = payload;

  next();
};
