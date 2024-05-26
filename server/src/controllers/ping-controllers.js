import statusCodes from "@constants/status-codes";
import messages from "@constants/message";
import { matchedData } from "express-validator";
import db from "@models";
import { Op } from "sequelize";

const sendMessage = async (req, res, next) => {
  try {
    const { sender, receiver, message } = matchedData(req);

    await db.ping.create({
      sender,
      receiver,
      message,
    });

    return res.status(statusCodes.CREATED).json({
      message: messages.PING_SUCCESS,
    });
  } catch (error) {
    next(error);
  }
};

const fetchmessages = async (req, res, next) => {
  try {
    const { identifier } = matchedData(req);

    const allMessages = await db.ping.findAll({
      where: {
        [Op.or]: [{ sender: identifier }, { receiver: identifier }],
      },
    });

    return res.status(statusCodes.SUCCESS).json({
      allMessages,
    });
  } catch (error) {
    next(error);
  }
};

export { sendMessage, fetchmessages };
