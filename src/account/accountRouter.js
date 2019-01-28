const express = require('express');
const {
  asyncMiddleware,
  validatorMiddleware,
} = require('../common/middlewares');
const { authMiddleware } = require('./middlewares');
const accountRules = require('./accountRules');
const accountController = require('./accountController');

const router = express.Router();

router.post(
  '/account/sign-up',
  accountRules.signUp,
  validatorMiddleware,
  asyncMiddleware(accountController.signUp),
);
router.post(
  '/account/login',
  accountRules.login,
  validatorMiddleware,
  asyncMiddleware(accountController.login),
);

router.post(
  '/account/refresh-auth-token',
  accountRules.refreshAuthToken,
  validatorMiddleware,
  asyncMiddleware(accountController.refreshAuthToken),
);

router.post(
  '/account/profile',
  authMiddleware,
  accountRules.updateProfile,
  validatorMiddleware,
  asyncMiddleware(accountController.updateProfile),
);

router.post(
  '/account/password',
  authMiddleware,
  accountRules.updatePassword,
  validatorMiddleware,
  asyncMiddleware(accountController.updatePassword),
);

router.get(
  '/account/profile',
  authMiddleware,
  asyncMiddleware(accountController.getProfile),
);
router.get(
  '/account/is-email-registered',
  accountRules.isEmailRegistered,
  validatorMiddleware,
  asyncMiddleware(accountController.isEmailRegistered),
);

router.post(
  '/account/create-password-reset-token',
  accountRules.createPasswordResetToken,
  validatorMiddleware,
  asyncMiddleware(accountController.createPasswordResetToken),
);

router.get(
  '/account/is-valid-password-reset-token',
  accountRules.isValidPasswordResetToken,
  validatorMiddleware,
  asyncMiddleware(accountController.isValidPasswordResetToken),
);

router.post(
  '/account/reset-password',
  accountRules.resetPassword,
  validatorMiddleware,
  asyncMiddleware(accountController.resetPassword),
);

router.post(
  '/account/logout',
  authMiddleware,
  asyncMiddleware(accountController.logout),
);

module.exports = router;
