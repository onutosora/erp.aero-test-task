
const errorHandler = (err, req, res, next) => {
  console.error(err);
  
  let status = err.status;
  let message = err.message;
  if (!status) {
    status = 500;
    message = 'Internal Server Error';
  }

  res.status(status).json({
    success: false,
    error: message
  });
};

export default errorHandler;
