const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "Страна создания фильма" должно быть заполнено'],
  },

  director: {
    type: String,
    required: [true, 'Поле "Режиссёр фильма" должно быть заполнено'],
  },

  duration: {
    type: Number,
    required: [true, 'Поле "Длительность фильма" должно быть заполнено'],
  },

  year: {
    type: String,
    required: [true, 'Поле "Год выпуска фильма" должно быть заполнено'],
  },

  description: {
    type: String,
    required: [true, 'Поле "Описание фильма" должно быть заполнено'],
  },

  image: {
    type: String,
    required: [true, 'Поле "Ссылка на постер к фильму" должно быть заполнено'],
    validate: [isUrl, 'Поле "Ссылка на постер к фильму" неверно заполнено'],
  },

  trailerLink: {
    type: String,
    required: [true, 'Поле "Ссылка на трейлер фильма" должно быть заполнено'],
    validate: [isUrl, 'Поле "Ссылка на трейлер фильма" неверно заполнено'],
  },

  thumbnail: {
    type: String,
    required: [true, 'Поле "Миниатюрное изображение постера к фильму" должно быть заполнено'],
    validate: [isUrl, 'Поле "Миниатюрное изображение постера к фильму" неверно заполнено'],
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, '_id пользователя не может быть пустым'],
  },

  movieId: {
    type: Number,
    required: [true, 'Поле "ID фильма" должно быть заполнено'],
  },

  nameRU: {
    type: String,
    required: [true, 'Поле "Название фильма на русском языке" должно быть заполнено'],
  },

  nameEN: {
    type: String,
    required: [true, 'Поле "Название фильма на английском языке" должно быть заполнено'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
