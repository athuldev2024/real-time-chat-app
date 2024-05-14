import bcrypt from "bcryptjs";
import statusCodes from "@constants/status-codes";
import messages from "@constants/message";
import { matchedData } from "express-validator";
import db from "@models";
import { Op } from "sequelize";

const SALT = 10;

const registerUser = async (req, res, next) => {
  try {
    const { username, password, mobile, email } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, SALT);

    const checkIfExists = await db.user.findOne({
      where: {
        mobile: String(mobile),
      },
    });

    if (checkIfExists)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_ALREADY_EXISTS });

    const newUser = await db.user.create({
      email: email.toLowerCase(),
      username,
      password,
      hashed: hashedPassword,
      mobile: String(mobile),
    });

    await newUser.createUpload({
      profilename: "placeholder - Will add later",
    });

    return res.status(statusCodes.CREATED).json({
      message: messages.USER_CREATED,
      identifier: newUser?.dataValues?.identifier,
      userDetails: newUser?.dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { mobile, password } = matchedData(req);

    const existingUser = await db.user.findOne({
      where: {
        mobile: String(mobile),
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_EXISTS });

    const match = await bcrypt.compare(
      password,
      existingUser?.dataValues?.hashed
    );

    if (!match)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.FAILURE });

    return res.status(statusCodes.SUCCESS).json({
      message: messages.LOGGED_IN,
      identifier: existingUser?.dataValues?.identifier,
      userDetails: existingUser?.dataValues,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
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

    await db.user.destroy({ where: { identifier: identifier } });

    return res
      .status(statusCodes.DELETED)
      .json({ message: messages.USER_DELETED });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const updateDetails = matchedData(req);

    const existingUser = await db.user.findOne({
      where: {
        identifier: updateDetails.identifier,
      },
    });

    if (!existingUser)
      return res
        .status(statusCodes.CONFLICT)
        .json({ message: messages.USER_NOT_EXISTS });

    const updateToDB = {
      ...updateDetails,
      ...(updateDetails.password && {
        hashed: await bcrypt.hash(updateDetails.password, SALT),
      }),
      ...(updateDetails.email && { email: updateDetails.email.toLowerCase() }),
      ...(updateDetails.dob ? { dob: new Date(updateDetails.dob) } : {}),
    };

    await db.user.update(updateToDB, {
      where: { identifier: updateDetails.identifier },
    });

    return res
      .status(statusCodes.UPDATED)
      .json({ message: messages.USER_UPDATED });
  } catch (error) {
    next(error);
  }
};

const getAllUsersExceptMe = async (req, res, next) => {
  try {
    const { identifier } = matchedData(req);

    const allUsers = await db.user.findAll({
      attributes: ["identifier", "mobile", "username", "email"],
      where: {
        identifier: {
          [Op.ne]: identifier,
        },
      },
    });

    return res.status(statusCodes.SUCCESS).json({
      allUsers,
    });
  } catch (error) {
    next(error);
  }
};

export { loginUser, registerUser, deleteUser, updateUser, getAllUsersExceptMe };
