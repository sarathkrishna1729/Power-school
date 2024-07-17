
class ResponseHelper {
    static success(res, data, message = 'Success', statusCode = 200) {
      res.status(statusCode).json({
        status: 'success',
        statusCode,
        message,
        data,
      });
    }
  
    static error(res, errorMessage = 'Error', statusCode = 500) {
      res.status(statusCode).json({
        status: 'error',
        statusCode,
        message: errorMessage,
        data: null,
      });
    }
  
    static notFound(res, message = 'Resource not found') {
      res.status(404).json({
        status: 'error',
        statusCode: 404,
        message,
        data: null,
      });
    }
  
    static unauthorized(res, message = 'Unauthorized') {
      res.status(401).json({
        status: 'error',
        statusCode: 401,
        message,
        data: null,
      });
    }
  
    static badRequest(res, message = 'Bad Request') {
      res.status(400).json({
        status: 'error',
        statusCode: 400,
        message,
        data: null,
      });
    }
  
    static forbidden(res, message = 'Forbidden') {
      res.status(403).json({
        status: 'error',
        statusCode: 403,
        message,
        data: null,
      });
    }
  }
  
  module.exports = ResponseHelper;
  