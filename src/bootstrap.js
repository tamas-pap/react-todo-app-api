const { eventEmitter } = require('./common/services');
const { eventTypes } = require('./account/constants');
const { sendPasswordResetEmail } = require('./account/listeners');

const bootstrap = () => {
  eventEmitter.on(
    eventTypes.PASSWORD_RESET_TOKEN_CREATED,
    sendPasswordResetEmail,
  );
};

module.exports = bootstrap;
