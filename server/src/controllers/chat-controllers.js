import ChatModel from "@models/chat-model";
import UserModel from "@models/user-model";
import { matchedData, validationResult } from "express-validator";
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

export const sendMessage = async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (validationErrors?.errors && validationErrors?.errors?.length > 0)
      return res.status(400).json({ errors: validationErrors.array() });

    const { myid, myusername, hisid, hisusername, message } = matchedData(req);

    console.log("REQ myid: ", myid);
    console.log("REQ hisid: ", hisid);

    const user = await ChatModel.findOne({
      $or: [
        { myid, hisid },
        { myid: hisid, hisid: myid },
      ],
    });

    if (user) {
      await ChatModel.findOneAndUpdate(
        {
          $or: [
            { myid, hisid },
            { myid: hisid, hisid: myid },
          ],
        },
        { messages: [...user.messages, message] }
      );
    } else {
      const temp = {
        myid,
        myusername,
        hisid,
        hisusername,
        messages: [message],
      };
      await ChatModel.create(temp);
    }

    return res.status(statusCodes.SUCCESS).json({
      message: "Message sent",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchMessages = async (req, res, next) => {
  try {
    const { myid, hisid } = matchedData(req);

    const messages = await ChatModel.find({
      $or: [
        { myid, hisid },
        { myid: hisid, hisid: myid },
      ],
    }).select("messages");

    return res.status(statusCodes.SUCCESS).json(messages);
  } catch (error) {
    next(error);
  }
};
