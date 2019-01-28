const bcrypt = require('bcryptjs');
const { omit } = require('lodash');
const { accountConfig } = require('../config');
const { UserModel } = require('../models');

exports.create = async values => {
  const hashedPassword = await bcrypt.hash(
    values.password,
    accountConfig.bcrypt.salts,
  );

  return UserModel.create({
    ...omit(values, 'password'),
    password: hashedPassword,
  });
};

exports.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) return;

  const isValidPassword = await bcrypt.compare(password, user.password);
  return isValidPassword ? user : undefined;
};

exports.verifyPassword = async (userId, password) => {
  const user = await UserModel.findById(userId);
  return !!user && bcrypt.compare(password, user.password);
};

exports.findByIdAndUpdate = async (userId, values) =>
  UserModel.findByIdAndUpdate(
    userId,
    { $set: omit(values, 'password') },
    { new: true },
  );

exports.findByIdAndUpdatePassword = async (userId, password) => {
  const hashedPassword = await bcrypt.hash(
    password,
    accountConfig.bcrypt.salts,
  );
  return UserModel.findByIdAndUpdate(
    userId,
    { $set: { password: hashedPassword } },
    { new: true },
  );
};

exports.findById = userId => UserModel.findById(userId);
exports.findByEmail = email => UserModel.findOne({ email });
exports.findAllByIds = userIds => UserModel.find({ _id: { $in: userIds } });
