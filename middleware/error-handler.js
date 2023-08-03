const errorHandlerMiddleware = async (err, req, res, next) => {
  console.log(err);
  res.status(404).json({sucess: false, data:"something went wrong please check well!"})
}

module.exports = errorHandlerMiddleware;