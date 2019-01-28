const { every } = require('lodash');
const { isMongoId } = require('validator');

class ValidationChain {
  constructor(checkMethod, fields) {
    this.chain = checkMethod(fields);
  }

  optional() {
    this.chain = this.chain.optional();
    return this;
  }

  isString() {
    return this.chain.isString().withMessage('Must be a string');
  }

  isText(allowEmpty) {
    return this.isString()
      .isLength({ min: Number(!allowEmpty) })
      .withMessage('Can not be empty');
  }

  isSmallText(allowEmpty) {
    return this.isText(allowEmpty)
      .isLength({ max: 128 })
      .withMessage('Must be at most 128 characters long');
  }

  isMediumText(allowEmpty) {
    return this.isText(allowEmpty)
      .isLength({ max: 512 })
      .withMessage('Must be at most 512 characters long');
  }

  isLargeText(allowEmpty) {
    return this.isText(allowEmpty)
      .isLength({ max: 1024 })
      .withMessage('Must be at most 512 characters long');
  }

  isEmail() {
    return this.isString()
      .isEmail()
      .withMessage('Must be a valid email');
  }

  isPassword() {
    return this.isString()
      .isLength({ min: 8, max: 64 })
      .withMessage('Must be between 8 and 64 characters long')
      .matches(/[a-zA-Z]/)
      .withMessage('Must contain at least one letter')
      .matches(/[0-9!-/:-@[-`{-~]/)
      .withMessage('Must contain at least one symbol');
  }

  isIn(array) {
    return this.chain
      .isIn(array)
      .withMessage(`Must one of the following values: ${array}`);
  }

  isMongoId() {
    return this.chain.isMongoId().withMessage('Must be a valid Mongo id');
  }

  isArrayOfMongoIds(allowEmpty) {
    return this.chain
      .isArray()
      .withMessage('Must be an array')
      .isLength({ min: Number(!allowEmpty) })
      .withMessage('Can not be empty')
      .custom(value =>
        every(value, isMongoId)
          ? Promise.resolve(true)
          : Promise.reject(new Error('Must be an array of Mongo ids')),
      );
  }
}

exports.createProxy = (checkMethod, fields) =>
  new Proxy(new ValidationChain(checkMethod, fields), {
    get: (validationChain, name) =>
      validationChain[name]
        ? validationChain[name]
        : validationChain.chain[name],
  });
