const ClientError = require('./ClientError');

/* eslint-disable require-jsdoc */
class InvariantError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
