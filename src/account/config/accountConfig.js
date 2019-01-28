exports.bcrypt = {
  salts: 10,
};

exports.tokens = {
  auth: {
    length: 128,
    expiresIn: process.env.AUTH_TOKEN_EXPIRES_IN,
  },
  refresh: {
    length: 128,
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  passwordReset: {
    length: 128,
    expiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRES_IN,
  },
};

exports.passport = {
  initialization: {
    userProperty: 'userId',
  },
  authentication: {
    session: false,
    failWithError: true,
  },
};
