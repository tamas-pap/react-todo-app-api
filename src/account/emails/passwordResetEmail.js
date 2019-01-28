const path = require('path');
const { appConfig } = require('../../common/config');
const { sendEmail } = require('../../common/services');

exports.send = (user, passwordResetToken) =>
  sendEmail({
    to: user.email,
    subject: `[${appConfig.name}] Reset your password`,
    templatePath: path.resolve(
      __dirname,
      '../templates/resetPasswordEmail.hbs',
    ),
    context: {
      user,
      passwordResetToken,
      appConfig,
    },
  });
