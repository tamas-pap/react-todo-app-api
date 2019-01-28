const { omit } = require('lodash');
const { database } = require('../../common/services');

const { Schema } = database;

const toObject = (doc, user) => omit(user, 'password');

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
  },
  {
    timestamps: true,
    toObject: { transform: toObject },
    toJSON: { transform: toObject },
  },
);

const UserModel = database.model('user', UserSchema);

module.exports = UserModel;
