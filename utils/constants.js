const ALLOWED_HOST = [
  'https://tstmnr.diploma.nomoredomains.rocks',
  'http://tstmnr.diploma.nomoredomains.rocks',
  'https://158.160.13.228',
  'http://158.160.13.228',
  'https://localhost:3000',
  'http://localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const DEFAULT_DATABASE = 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  ALLOWED_HOST,
  DEFAULT_ALLOWED_METHODS,
  DEFAULT_DATABASE,
};
