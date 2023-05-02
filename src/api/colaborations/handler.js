const ClientError = require('../../exceptions/ClientError');

/* eslint-disable require-jsdoc */
class CollaborationsHandler {
  constructor(collaborationsService, notesService, validator) {
    this._collaborationsService = collaborationsService;
    this._notesService = notesService;
    this._validator = validator;
  }

  async postCollaborationHandler(request, h) {
    try {
      this._validator.validateCollaborationPayload(request.payload);
      const {id: credentialId} = request.auth.credentials;
      const {noteId, userId} = request.payload;

      await this._notesService.verifyNoteOwner(noteId, credentialId);
      // eslint-disable-next-line max-len
      const collaborationId = await this._collaborationsService.addCollaboration(noteId, userId);

      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      throw new ClientError(error.message, error.statusCode);
    }
  }

  async deleteCollaborationHandler(request, h) {
    try {
      this._validator.validateCollaborationPayload(request.payload);
      const {id: credentialId} = request.auth.credentials;
      const {noteId, userId} = request.payload;

      await this._notesService.verifyNoteOwner(noteId, credentialId);
      await this._collaborationsService.deleteCollaboration(noteId, userId);

      return {
        status: 'success',
        message: 'Kolaborasi berhasil dihapus',
      };
    } catch (error) {
      throw new ClientError(error.message, error.statusCode);
    }
  }
}

module.exports = CollaborationsHandler;
