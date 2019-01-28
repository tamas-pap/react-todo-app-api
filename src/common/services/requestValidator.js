const {
  check,
  body,
  cookie,
  header,
  param,
  query,
  validationResult,
} = require('express-validator/check');
const validationChain = require('./validationChain');

exports.check = fields => validationChain.createProxy(check, fields);
exports.body = fields => validationChain.createProxy(body, fields);
exports.cookie = fields => validationChain.createProxy(cookie, fields);
exports.header = fields => validationChain.createProxy(header, fields);
exports.param = fields => validationChain.createProxy(param, fields);
exports.query = fields => validationChain.createProxy(query, fields);
exports.validationResult = validationResult;
