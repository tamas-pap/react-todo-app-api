const ms = require('ms');
const uniqString = require('uniq-string');
const { accountConfig } = require('../config');
const { UserTokenModel } = require('../models');

const createUserToken = (userId, type, length, expiresIn) =>
  UserTokenModel.create({
    userId,
    type,
    token: uniqString(length),
    expiresAt: new Date(Date.now() + ms(expiresIn)),
  });

exports.createAuthToken = userId =>
  createUserToken(
    userId,
    UserTokenModel.types.AUTH_TOKEN,
    accountConfig.tokens.auth.length,
    accountConfig.tokens.auth.expiresIn,
  );

exports.createRefreshToken = userId =>
  createUserToken(
    userId,
    UserTokenModel.types.REFRESH_TOKEN,
    accountConfig.tokens.refresh.length,
    accountConfig.tokens.refresh.expiresIn,
  );

exports.createPasswordResetToken = userId =>
  createUserToken(
    userId,
    UserTokenModel.types.PASSWORD_RESET_TOKEN,
    accountConfig.tokens.passwordReset.length,
    accountConfig.tokens.passwordReset.expiresIn,
  );

exports.findAuthToken = token =>
  UserTokenModel.findOne({ token, type: UserTokenModel.types.AUTH_TOKEN });

exports.findRefreshToken = token =>
  UserTokenModel.findOne({ token, type: UserTokenModel.types.REFRESH_TOKEN });

exports.findPasswordResetToken = token =>
  UserTokenModel.findOne({
    token,
    type: UserTokenModel.types.PASSWORD_RESET_TOKEN,
  });

exports.deleteAllAuthAndRefreshTokensForUser = async userId =>
  UserTokenModel.deleteMany({
    userId,
    type: {
      $in: [
        UserTokenModel.types.AUTH_TOKEN,
        UserTokenModel.types.REFRESH_TOKEN,
      ],
    },
  });

exports.deleteAllPasswordResetTokensForUser = userId =>
  UserTokenModel.deleteMany({
    userId,
    type: UserTokenModel.types.PASSWORD_RESET_TOKEN,
  });
