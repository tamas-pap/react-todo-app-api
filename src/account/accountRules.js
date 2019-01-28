const { requestValidator } = require('../common/services');
const { userService } = require('./services');

const { body, query, header } = requestValidator;

const firstNameRule = body('firstName').isSmallText();
const lastNameRule = body('lastName').isSmallText();
const emailRule = (from = body) => from('email').isEmail();
const passwordRule = body('password').isPassword();
const refreshTokenRule = header('refreshToken').isText();
const oldPasswordRule = body('oldPassword').isText();
const newPasswordRule = body('newPassword').isPassword();
const passwordResetTokenRule = query('passwordResetToken').isText();

const uniqueEmailRule = body('email')
  .isEmail()
  .custom(async (email, { req }) => {
    const user = await userService.findByEmail(email);
    return user && user.id !== String(req.userId)
      ? Promise.reject(new Error('This email already exists'))
      : Promise.resolve(true);
  });

module.exports = {
  signUp: [firstNameRule, lastNameRule, uniqueEmailRule, passwordRule],
  login: [emailRule(), passwordRule],
  refreshAuthToken: [refreshTokenRule],
  isEmailRegistered: [emailRule(query)],
  updateProfile: [firstNameRule, lastNameRule, uniqueEmailRule],
  updatePassword: [oldPasswordRule, newPasswordRule],
  createPasswordResetToken: [emailRule()],
  isValidPasswordResetToken: [passwordResetTokenRule],
  resetPassword: [passwordResetTokenRule, passwordRule],
};
