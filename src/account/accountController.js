const { eventTypes } = require('./constants');
const { eventEmitter } = require('../common/services');
const { userService, userTokenService } = require('./services');

exports.signUp = async (req, res) => {
  const user = await userService.create(req.body);
  const authToken = await userTokenService.createAuthToken(user.id);
  const refreshToken = await userTokenService.createRefreshToken(user.id);

  res.set('AuthToken', authToken.token);
  res.set('RefreshToken', refreshToken.token);
  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.findByCredentials(email, password);

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials.' });
    return;
  }

  const authToken = await userTokenService.createAuthToken(user.id);
  const refreshToken = await userTokenService.createRefreshToken(user.id);

  res.set('AuthToken', authToken.token);
  res.set('RefreshToken', refreshToken.token);
  res.json(user);
};

exports.refreshAuthToken = async (req, res) => {
  const refreshToken = await userTokenService.findRefreshToken(
    req.get('RefreshToken'),
  );

  if (!refreshToken) {
    res.status(401).json({ message: 'Invalid refresh token.' });
    return;
  }

  const user = await userService.findById(refreshToken.userId);
  const authToken = await userTokenService.createAuthToken(user.id);

  res.set('AuthToken', authToken.token);
  res.set('RefreshToken', refreshToken.token);
  res.json();
};

exports.updateProfile = async (req, res) => {
  const user = await userService.findByIdAndUpdate(req.userId, req.body);
  res.json(user);
};

exports.updatePassword = async (req, res) => {
  const { userId } = req;
  const isValidPassword = await userService.verifyPassword(
    userId,
    req.body.oldPassword,
  );

  if (!isValidPassword) {
    res.status(403).json({ message: 'Invalid old password.' });
    return;
  }

  await userService.findByIdAndUpdatePassword(userId, req.body.newPassword);
  res.json();
};

exports.getProfile = async (req, res) => {
  const user = await userService.findById(req.userId);
  res.json(user);
};

exports.isEmailRegistered = async (req, res) => {
  const user = await userService.findByEmail(req.query.email);
  res.json({ isRegistered: !!user });
};

exports.createPasswordResetToken = async (req, res) => {
  const user = await userService.findByEmail(req.body.email);

  if (!user) {
    res
      .status(422)
      .json({ message: 'Could not find an account with this email.' });

    return;
  }

  const passwordResetToken = await userTokenService.createPasswordResetToken(
    user,
  );

  eventEmitter.emit(
    eventTypes.PASSWORD_RESET_TOKEN_CREATED,
    passwordResetToken,
  );

  res.json();
};

exports.isValidPasswordResetToken = async (req, res) => {
  const passwordResetToken = await userTokenService.findPasswordResetToken(
    req.query.passwordResetToken,
  );
  res.json({ isValid: !!passwordResetToken });
};

exports.resetPassword = async (req, res) => {
  const passwordResetToken = await userTokenService.findPasswordResetToken(
    req.query.passwordResetToken,
  );

  if (!passwordResetToken) {
    res
      .status(422)
      .json({ message: 'Invalid or expired password reset token.' });
    return;
  }

  await userService.findByIdAndUpdatePassword(
    passwordResetToken.userId,
    req.body.password,
  );

  await userTokenService.deleteAllPasswordResetTokensForUser(
    passwordResetToken.userId,
  );

  res.json();
};

exports.logout = async (req, res) => {
  await userTokenService.deleteAllAuthAndRefreshTokensForUser(req.userId);
  res.json();
};
