const { UserModel } = require('../models');
const { passwordResetEmail } = require('../emails');

const sendPasswordResetEmail = async passwordResetToken => {
  const { userId } = passwordResetToken;
  const user = await UserModel.findById(userId);

  return passwordResetEmail.send(user, passwordResetToken);
};

module.exports = sendPasswordResetEmail;
