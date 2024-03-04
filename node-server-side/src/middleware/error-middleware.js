import statusCodes from "@constants/status-codes";

const errorHandler = (error, req, res, next) => {
  return res.status(error.statusCode || statusCodes.SERVER_ERROR).json({
    message: error.message,
  });
};

export default errorHandler;
