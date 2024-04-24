import statusCodes from "@constants/status-codes";
import { validationResult } from "express-validator";

export const errorHandler = (error, req, res, next) => {
  return res.status(error.statusCodes || statusCodes.SERVER_ERROR).json({
    message: error.message,
  });
};

export const checkIfValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors?.errors && validationErrors?.errors?.length > 0)
    return res
      .status(statusCodes.INVALID_REQUEST)
      .json({ errors: validationErrors.array() });

  next();
};
