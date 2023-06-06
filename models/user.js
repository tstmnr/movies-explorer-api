const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "E-mail" должно быть заполнено'],
    unique: true,
    validate: [isEmail, 'Поле "E-mail" неверно заполнено'],
  },

  password: {
    type: String,
    required: [true, 'Поле "Пароль" должно быть заполнено'],
    select: false,
  },

  name: {
    type: String,
    minlength: [2, 'Минимальная длина поля "Имя" - 2'],
    maxlength: [30, 'Максимальная длина поля "Имя" - 30'],
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
