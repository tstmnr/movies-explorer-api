const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const cookie = req.cookies;

  if (!cookie) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
  const token = cookie.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new UnauthorizedError('Неверный токен');
  }

  req.user = payload;

  next();
};
