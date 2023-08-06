/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
// импортируем пакеты
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const celebrateErrors = require('celebrate').errors;
require('dotenv').config();

const { PORT = 3000, MONGO_URL } = process.env;

// импортируем middlewares
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errors = require('./middlewares/errors');
const rateLimiter = require('./middlewares/rateLimiter');

// импортируем все остальное
const router = require('./routes/index');

const app = express();

// подключаем CORS, helmet, limiter и parsers
app.use(cors);
app.use(helmet());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// коннектимся к базе Mongo
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Успешное подключение к базе');
  })
  .catch((err) => {
    console.error(err.status, err.message);
  });

// подключаем логгер запросов
app.use(requestLogger);

// подключаем роуты
app.use(router);

// подключаем логгер ошибок
app.use(errorLogger);

// подключаем обработчик ошибок celebrate
app.use(celebrateErrors());

// централизованный обработчик ошибок
app.use(errors);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
