 const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).send({
    status: 'error',
    error: errorMessage,
  });
  
 const sendSuccessResponse = (res, code, data) => res.status(code).send({
    status: 'success',
    data,
  });

  module.exports = {
      sendErrorResponse,
      sendSuccessResponse
  }