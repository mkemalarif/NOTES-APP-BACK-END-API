/* eslint-disable require-jsdoc */
const ClientError = require('../../exceptions/ClientError');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postUserHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);
      const {username, password, fullname} = request.payload;

      const userId= await this._service.addUser({username, password, fullname});

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: {
          userId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      throw new ClientError(error.message, error.statusCode);
    }
  }

  async getUserByIdHandler(request) {
    try {
      const {id} = request.params;
      console.log(id);
      const user = await this._service.getUserById(id);

      return {
        status: 'success',
        data: {
          user,
        },
      };
    } catch (error) {
      throw new ClientError(error.message, error.statusCode);
    }
  }
}

module.exports = UsersHandler;
