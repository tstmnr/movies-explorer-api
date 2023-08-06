const ALLOWED_HOST = [
  'https://tstmnr.diploma.nomoredomains.rocks',
  'http://tstmnr.diploma.nomoredomains.rocks',
  'https://51.250.104.104',
  'http://51.250.104.104',
  'https://localhost:3000',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const MOVIE_BAD_DATA_MESSAGE = 'Переданы некоректные данные при создании карточки';
const MOVIE_NOT_FOUND_MESSAGE = 'Фильм не найден';
const MOVIE_FORBIDDEN_MESSAGE = 'Нельзя удалить фильм созданный не вами';
const MOVIE_BAD_ID_MESSAGE = 'Передан некорректный ID фильма';
const MOVIE_DELETE_NF_MESSAGE = 'Карточка с указанным ID не найдена';
const SIGNOUT_MESSAGE = 'Выход выполнен успешно';
const SIGNUP_BAD_DATA_MESSAGE = 'Переданы некоректные данные при регистрации';
const SIGNUP_CONFLICT_MESSAGE = 'Пользователь с указанным email уже зарегестрирован';
const USER_NOT_FOUND_MESSAGE = 'Пользователь с указанным ID не найден';
const USER_BAD_DATA_MESSAGE = 'Переданны некоретные данные для редактирования данных пользователя';
const AUTH_MESSAGE = 'Необходима авторизация';
const TOKEN_MESSAGE = 'Неверный токен';

module.exports = {
  ALLOWED_HOST,
  DEFAULT_ALLOWED_METHODS,
  DEFAULT_DATABASE,
  MOVIE_BAD_DATA_MESSAGE,
  MOVIE_NOT_FOUND_MESSAGE,
  MOVIE_FORBIDDEN_MESSAGE,
  MOVIE_BAD_ID_MESSAGE,
  MOVIE_DELETE_NF_MESSAGE,
  SIGNOUT_MESSAGE,
  SIGNUP_BAD_DATA_MESSAGE,
  SIGNUP_CONFLICT_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_BAD_DATA_MESSAGE,
  AUTH_MESSAGE,
  TOKEN_MESSAGE,
};
