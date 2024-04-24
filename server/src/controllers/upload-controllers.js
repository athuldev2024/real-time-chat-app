import statusCodes from "@constants/status-codes";
import messages from "@constants/message";
import { matchedData } from "express-validator";
import db from "@models";
import fs from "fs";
import path from "path";

export const userUploadSingleFile = async (req, res, next) => {
  try {
    const { identifier } = matchedData(req);
    const fileName = req.file.originalname;

    const existingUser = await db.user.findOne({
      where: {
        identifier: identifier,
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_EXISTS });

    console.log("FILENAME: ", fileName);

    await db.user.update(
      { profilename: fileName },
      {
        where: { identifier: identifier },
      }
    );

    return res.status(statusCodes.SUCCESS).json({
      message: messages.SINGLE_FILE_UPLOAD,
    });
  } catch (error) {
    next(error);
  }
};

export const previewSingleFile = async (req, res, next) => {
  try {
    const { identifier } = matchedData(req);

    const existingUser = await db.user.findOne({
      where: {
        identifier: identifier,
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_EXISTS });

    const filename = existingUser?.dataValues?.profilename;
    const filePath = path.join(__dirname, "..", "..", "public", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(statusCodes.CONFLICT).json({
        message: messages.FILE_NOT_FOUND,
      });
    }

    return res.status(statusCodes.SUCCESS).sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
