const { database } = require('../../common/services');

const AUTH_TOKEN = 'authToken';
const REFRESH_TOKEN = 'refreshToken';
const PASSWORD_RESET_TOKEN = 'passwordResetToken';

const { Schema } = database;

const UserTokenSchema = new Schema(
  {
    userId: Schema.Types.ObjectId,
    type: String,
    token: { type: String, unique: true },
    expiresAt: Date,
  },
  {
    timestamps: true,
  },
);

UserTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

UserTokenSchema.statics.types = {
  AUTH_TOKEN,
  REFRESH_TOKEN,
  PASSWORD_RESET_TOKEN,
};

const UserTokenModel = database.model('userToken', UserTokenSchema);

module.exports = UserTokenModel;
