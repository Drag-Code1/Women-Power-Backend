const { StatusCodes } = require('http-status-codes');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.statusCode && err.message) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong on the server',
  });
}

module.exports = errorHandler;
