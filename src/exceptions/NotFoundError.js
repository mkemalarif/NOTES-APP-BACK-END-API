/* eslint-disable require-jsdoc */
const ClientError = require('./ClientError');

// eslint-disable-next-line require-jsdoc
class NotFoundError extends ClientError {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
