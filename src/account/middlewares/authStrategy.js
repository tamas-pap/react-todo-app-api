const { Strategy } = require('passport-http-bearer');
const { userTokenService } = require('../services');

const authStrategy = new Strategy(async (token, done) => {
  try {
    const authToken = await userTokenService.findAuthToken(token);
    const userId = authToken && authToken.userId;
    return userId ? done(undefined, userId) : done(undefined, false);
  } catch (error) {
    done(error, false);
  }
});

module.exports = authStrategy;
