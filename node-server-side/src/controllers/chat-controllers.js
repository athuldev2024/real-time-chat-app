import UserModel from "@models/user-model";
import { matchedData } from "express-validator";
import statusCodes from "@constants/status-codes";

export const getAllUsers = async (req, res, next) => {
  try {
    const { username } = matchedData(req);
    const users = await UserModel.find({
      username: { $ne: username },
    }).select("id username");

    return res.status(statusCodes.SUCCESS).json(users);
  } catch (error) {
    next(error);
  }
};
