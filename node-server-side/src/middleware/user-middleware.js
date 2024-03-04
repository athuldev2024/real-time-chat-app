import UserModel from "@models/user-model";
import statusCodes from "@constants/status-codes";
import { matchedData, validationResult } from "express-validator";

export const checkIfUserExists = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (validationErrors?.errors && validationErrors?.errors?.length > 0)
      return res.status(400).json({ errors: validationErrors.array() });

    const { mobile, username } = matchedData(req);

    const checkIfExists = await UserModel.exists({
      $or: [{ mobile }, { username }],
    });

    switch (req.path.split("/")[1]) {
      case "login":
      case "delete":
      case "update":
        if (!checkIfExists)
          return res
            .status(statusCodes.NOT_FOUND)
            .json({ message: "User does not exists." });
        break;
      case "register":
        if (checkIfExists)
          return res
            .status(statusCodes.CONFLICT)
            .json({ message: "User already exists." });
        break;
    }

    next();
  } catch (error) {
    next(error);
  }
};
