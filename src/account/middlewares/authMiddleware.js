const passport = require('passport');
const { accountConfig } = require('../config');

const authMiddleware = passport.authenticate(
  'bearer',
  accountConfig.passport.authentication,
);

module.exports = authMiddleware;
