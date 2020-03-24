 const sendErrorResponse = (res, code, errorMessage, e = null) => res.status(code).send({
    status: 'error',
    error: errorMessage,
  });
  
 const sendSuccessResponse = (res, code, data) => res.status(code).send(data);

 const remove_id = (array) => {
   return array.map((x) => {
      delete x._id;
      return x;
   })
 }

  module.exports = {
      sendErrorResponse,
      sendSuccessResponse,
      remove_id
  }