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

    const existingUser = await db.upload.findOne({
      where: {
        identifier: identifier,
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_EXISTS });

    await db.upload.update(
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
    let filePath;
    const { identifier } = matchedData(req);

    const existingUser = await db.upload.findOne({
      where: {
        identifier: identifier,
      },
    });

    if (existingUser?.dataValues && !fs.existsSync(filePath)) {
      const filename = existingUser?.dataValues?.profilename;
      filePath = path.join(__dirname, "..", "..", "public", filename);
    } else {
      filePath = path.join(__dirname, "..", "..", "public", "placeholder.png");
    }

    return res.status(statusCodes.SUCCESS).sendFile(filePath);
  } catch (error) {
    next(error);
  }
};
